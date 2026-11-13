#!/usr/bin/env python3
"""Portable, non-destructive UI-system consumer bootstrap and token sync.

No third-party Python dependencies. Generated files are deliberately isolated from
product-owned layouts, SwiftUI navigation, Unity prefabs and Xcode projects.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import math
import re
import sys
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1]
IDENTITY = "BIMfabrik/ui-system designctl"
ROLES = (
    "background", "foreground", "surface", "surface-subtle", "primary",
    "primary-foreground", "accent", "accent-foreground", "border",
    "muted-foreground", "success", "warning", "destructive",
)
PLATFORMS = ("web", "swiftui", "unity", "godot")
SURFACES = ("app", "product-site", "game")


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_config(config: dict) -> None:
    if not isinstance(config, dict) or config.get("schemaVersion") != 1:
        raise ValueError("Unsupported or missing consumer schemaVersion (expected 1)")
    if config.get("brand") not in ("zree", "bimfabrik"):
        raise ValueError("brand must be zree or bimfabrik")
    if config.get("platform") not in PLATFORMS:
        raise ValueError(f"platform must be one of {', '.join(PLATFORMS)}")
    if config.get("surface") not in SURFACES:
        raise ValueError(f"surface must be one of {', '.join(SURFACES)}")
    if config["surface"] == "product-site" and config["platform"] != "web":
        raise ValueError("product-site requires web platform")
    if not isinstance(config.get("name"), str) or not 1 <= len(config["name"].strip()) <= 80:
        raise ValueError("name must contain 1–80 characters")


def css_values(css: str, selector: str) -> dict[str, str]:
    match = re.search(selector + r"\s*\{([^}]*)\}", css, flags=re.S)
    if not match:
        raise ValueError(f"BIMfabrik CSS selector not found: {selector}")
    return dict(re.findall(r"--([\w-]+)\s*:\s*([^;]+);", match.group(1)))


def profile(brand: str) -> dict:
    if brand == "zree":
        data = read_json(SOURCE / "design" / "zree.json")
        modes = data["colorModes"]
        metrics = data["metrics"]
        typography = data["typography"]
    else:
        css = (SOURCE / "styles" / "tokens.css").read_text(encoding="utf-8")
        light = css_values(css, r":root")
        dark = css_values(css, r'\[data-theme="dark"\]')
        modes = {"light": light, "dark": dark}
        metrics = {"cornerRadius": 8, "spacingUnit": 4,
                   "minimumTouchTarget": 44, "childGameTouchTarget": 56,
                   "fastMotionMs": 150}
        typography = {"body": "system-ui, -apple-system, sans-serif",
                      "display": "system-ui, -apple-system, sans-serif"}
    for mode in ("light", "dark"):
        for role in ROLES:
            if role not in modes[mode]:
                raise ValueError(f"Missing {brand} {mode} semantic color: {role}")
    return {"brand": brand, "colors": modes, "metrics": metrics,
            "typography": typography}


def oklch_to_rgb(value: str) -> tuple[int, int, int]:
    """Convert CSS oklch to sRGB; alpha compositing is deliberately unsupported."""
    match = re.fullmatch(r"oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)", value)
    if not match:
        raise ValueError(f"Only opaque RGB or OKLCH design colors are supported: {value}")
    l, c, h = map(float, match.groups())
    a, b = c * math.cos(math.radians(h)), c * math.sin(math.radians(h))
    ll = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
    mm = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
    ss = (l - 0.0894841775 * a - 1.2914855480 * b) ** 3
    linear = (
        +4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss,
        -1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss,
        -0.0041960863 * ll - 0.7034186147 * mm + 1.7076147010 * ss,
    )
    def gamma(v: float) -> int:
        v = max(0.0, min(1.0, v))
        out = 12.92 * v if v <= 0.0031308 else 1.055 * (v ** (1 / 2.4)) - 0.055
        return round(255 * out)
    return tuple(gamma(v) for v in linear)


def rgb(value: str) -> tuple[int, int, int]:
    value = value.strip()
    if re.fullmatch(r"#[0-9a-fA-F]{6}", value):
        return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))
    return oklch_to_rgb(value)


def color_for(data: dict, mode: str, role: str) -> tuple[int, int, int]:
    value = data["colors"][mode][role].strip()
    # CSS alpha appears inside parentheses, e.g. oklch(1 0 0 / 12%).
    alpha_match = re.fullmatch(r"oklch\(([^/]+)\s*/\s*([\d.]+)(%)?\)", value)
    if alpha_match:
        solid = rgb("oklch(" + alpha_match.group(1).strip() + ")")
        opacity = float(alpha_match.group(2)) / (100 if alpha_match.group(3) else 1)
        if not 0 <= opacity <= 1 or role == "background":
            raise ValueError("Unsupported translucent base design color")
        underlay = color_for(data, mode, "background")
        return tuple(round(opacity * fg + (1 - opacity) * bg) for fg, bg in zip(solid, underlay))
    return rgb(value)


def native_hex(data: dict, mode: str, role: str) -> str:
    return "#" + "".join(f"{n:02x}" for n in color_for(data, mode, role))


def pascal(role: str) -> str:
    return "".join(part.capitalize() for part in role.split("-"))


def render_css(data: dict) -> str:
    brand = data["brand"]
    lines = [f"/* @generated by {IDENTITY}; edits will be replaced */",
             f'/* Brand: {brand}. Import after the base application styles. */',
             f':root[data-ds-brand="{brand}"] {{']
    for role in ROLES:
        lines.append(f"  --ds-{role}: {data['colors']['light'][role]};")
    lines += ["}", "", "@media (prefers-color-scheme: dark) {",
              f'  :root[data-ds-brand="{brand}"]:not([data-theme="light"]) {{']
    for role in ROLES:
        lines.append(f"    --ds-{role}: {data['colors']['dark'][role]};")
    lines += ["  }", "}", "", f':root[data-ds-brand="{brand}"][data-theme="dark"] {{']
    for role in ROLES:
        lines.append(f"  --ds-{role}: {data['colors']['dark'][role]};")
    lines += ["}", ""]
    return "\n".join(lines)


def render_swift(data: dict) -> str:
    out = [f"// @generated by {IDENTITY}; edits will be replaced",
           "import SwiftUI", "", "/// Brand colors only. Use native SwiftUI navigation, sheets and controls.",
           "public enum CorporateDesignTokens {",
           f'    public static let brand = "{data["brand"]}"',
           f'    public static let cornerRadius: CGFloat = {data["metrics"]["cornerRadius"]}',
           f'    public static let minimumTouchTarget: CGFloat = {data["metrics"]["minimumTouchTarget"]}',
           f'    public static let childGameTouchTarget: CGFloat = {data["metrics"]["childGameTouchTarget"]}', ""]
    for role in ROLES:
        colors = [color_for(data, mode, role) for mode in ("light", "dark")]
        def swift_color(ch: tuple[int, int, int]) -> str:
            return "Color(red: %.6f, green: %.6f, blue: %.6f)" % tuple(n / 255 for n in ch)
        out += [f"    public static func {pascal(role)[0].lower() + pascal(role)[1:]}(_ scheme: ColorScheme) -> Color {{",
                f"        scheme == .dark ? {swift_color(colors[1])} : {swift_color(colors[0])}",
                "    }", ""]
    out += ["}", ""]
    return "\n".join(out)


def render_unity_cs(data: dict) -> str:
    out = [f"// @generated by {IDENTITY}; edits will be replaced",
           "using UnityEngine;", "", "namespace BIMfabrik.DesignSystem", "{",
           "    /// <summary>Shared palette/metrics. Bind actual UGUI or UI Toolkit HUD controls explicitly.</summary>",
           "    public static class CorporateDesignTokens", "    {",
           f'        public const string Brand = "{data["brand"]}";',
           f'        public const int CornerRadius = {data["metrics"]["cornerRadius"]};',
           f'        public const int MinimumTouchTarget = {data["metrics"]["minimumTouchTarget"]};',
           f'        public const int ChildGameTouchTarget = {data["metrics"]["childGameTouchTarget"]};', ""]
    for role in ROLES:
        light = ", ".join(map(str, color_for(data, "light", role)))
        dark = ", ".join(map(str, color_for(data, "dark", role)))
        out += [f"        public static Color32 {pascal(role)}(bool dark) => dark",
                f"            ? new Color32({dark}, 255) : new Color32({light}, 255);", ""]
    out += ["    }", "}", ""]
    return "\n".join(out)


def render_uss(data: dict) -> str:
    out = [f"/* @generated by {IDENTITY}; edits will be replaced */",
           "/* Explicit light/dark classes: Unity USS does not follow CSS media queries. */",
           ".ds-root {"]
    for role in ROLES:
        out.append(f"    --ds-{role}: {native_hex(data, 'light', role)};")
    out += ["}", ".ds-root.ds-dark {"]
    for role in ROLES:
        out.append(f"    --ds-{role}: {native_hex(data, 'dark', role)};")
    out += ["}", ""]
    return "\n".join(out)


def render_godot(data: dict) -> str:
    payload = {"generatedBy": IDENTITY, "brand": data["brand"],
               "colors": {mode: {k: native_hex(data, mode, k) for k, v in roles.items() if k in ROLES}
                          for mode, roles in data["colors"].items()},
               "metrics": data["metrics"]}
    return json.dumps(payload, indent=2) + "\n"


def outputs(config: dict) -> dict[str, str]:
    data = profile(config["brand"])
    platform = config["platform"]
    if platform == "web":
        files = {"ui-system/generated/theme.css": render_css(data)}
    elif platform == "swiftui":
        files = {"DesignSystem/Generated/CorporateDesignTokens.swift": render_swift(data)}
    elif platform == "unity":
        files = {"Assets/ZreeUI/Generated/CorporateDesignTokens.cs": render_unity_cs(data),
                 "Assets/ZreeUI/Generated/CorporateDesignTokens.uss": render_uss(data)}
    else:
        files = {"addons/zree_ui/generated/design_tokens.json": render_godot(data)}
    digest = hashlib.sha256(json.dumps(data, sort_keys=True).encode("utf-8")).hexdigest()
    files[".ui-system.lock.json"] = json.dumps({"generatedBy": IDENTITY, "brand": data["brand"],
                                                    "sourceDigest": digest, "platform": platform},
                                                   indent=2, sort_keys=True) + "\n"
    return files


def is_managed(path: Path) -> bool:
    try:
        return IDENTITY in path.read_text(encoding="utf-8")[:350]
    except (UnicodeDecodeError, OSError):
        return False


def sync(root: Path, check: bool) -> bool:
    config_path = root / ".ui-system.json"
    if not config_path.is_file():
        raise ValueError("Consumer has no .ui-system.json; run 'init' once first")
    config = read_json(config_path)
    validate_config(config)
    expected = outputs(config)
    # Preflight all paths: never overwrite any project-authored source.
    changes = []
    for rel, content in expected.items():
        target = root / rel
        # A symlinked parent could otherwise redirect managed writes outside the repo.
        parent = target.parent
        while parent != root:
            if parent.is_symlink():
                raise ValueError(f"Refusing symlinked managed directory: {rel}")
            parent = parent.parent
        if target.exists() and target.is_symlink():
            raise ValueError(f"Refusing symlink as managed file: {rel}")
        if target.is_file() and not is_managed(target):
            raise ValueError(f"Refusing to replace project-owned file: {rel}")
        if target.exists() and not target.is_file():
            raise ValueError(f"Expected a regular file, got another object: {rel}")
        if not target.is_file() or target.read_text(encoding="utf-8") != content:
            changes.append((rel, content))
    for rel, content in changes:
        print(f"{'DRIFT' if check else 'SYNC'} {rel}")
        if not check:
            path = root / rel
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
    if not changes:
        print("Design system is current")
    return not changes if check else True


def marketing_html(name: str, brand: str) -> str:
    safe = html.escape(name, quote=True)
    label = "ZREE" if brand == "zree" else "BIMfabrik"
    return f'''<!doctype html>
<!-- Editable product-site starter. designctl sync does not overwrite this page. -->
<html lang="en" data-ds-brand="{brand}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>{safe} — {label}</title>
  <meta name="description" content="Official {safe} product information and support.">
  <link rel="stylesheet" href="../ui-system/generated/theme.css">
  <link rel="stylesheet" href="site.css">
</head>
<body>
  <a class="skip" href="#content">Skip to content</a>
  <header class="container header"><a class="wordmark" href="/">{label}</a><nav aria-label="Main navigation"><a href="#features">About</a><a href="#support">Support</a></nav></header>
  <main id="content">
    <section class="container hero">
      <p class="eyebrow">{label} · Product</p>
      <h1>{safe}</h1>
      <p class="lead">Replace this sentence with the real, concise benefit of the product.</p>
      <p>Use actual in-app screenshots and verified product details. Do not invent testimonials, metrics or availability.</p>
      <a class="action" href="#features">Explore the product</a>
    </section>
    <section class="container detail" id="features"><h2>What it does</h2><p>Describe real functionality here. Add authentic screenshots with useful alt text.</p></section>
    <section class="container detail" id="support"><h2>Support and privacy</h2><p>Add real support contact details, privacy-policy URL, and an App Store link once available.</p></section>
  </main>
  <footer class="container footer"><span>{label}</span><span>Product information</span></footer>
</body>
</html>
'''


def marketing_css() -> str:
    return '''/* Editable product-site starter. Keep real content product-owned. */
* { box-sizing: border-box; }
:root { color-scheme: light dark; }
body { margin: 0; background: var(--ds-background); color: var(--ds-foreground); font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; }
a { color: inherit; text-underline-offset: .2em; }
a:focus-visible { outline: 3px solid var(--ds-primary); outline-offset: 4px; }
.container { width: min(100% - 40px, 1100px); margin-inline: auto; }
.skip { position: absolute; left: 1rem; top: -5rem; padding: .5rem 1rem; background: var(--ds-primary); color: var(--ds-primary-foreground); }
.skip:focus { top: .5rem; }
.header { min-height: 82px; display: flex; justify-content: space-between; align-items: center; gap: 2rem; border-bottom: 1px solid var(--ds-border); }
.header nav { display: flex; gap: 1.5rem; }
.wordmark { font-weight: 750; letter-spacing: .11em; text-decoration: none; }
.hero { padding: clamp(64px, 11vw, 140px) 0; max-width: 850px; }
.eyebrow { font-size: .75rem; font-weight: 650; letter-spacing: .1em; text-transform: uppercase; }
h1 { font: 400 clamp(3.5rem, 9vw, 7rem)/1.04 Georgia, "Times New Roman", serif; letter-spacing: -.045em; margin: .4em 0; }
.lead { font-size: clamp(1.2rem, 2vw, 1.55rem); color: var(--ds-foreground); }
.hero > p:not(.lead, .eyebrow) { max-width: 36rem; color: var(--ds-muted-foreground); }
.action { display: inline-block; margin-top: 1rem; border-radius: 8px; padding: .8rem 1.25rem; background: var(--ds-primary); color: var(--ds-primary-foreground); font-weight: 650; text-decoration: none; }
.action:hover { opacity: .88; }
.detail { border-top: 1px solid var(--ds-border); padding: 3rem 0; }
.detail p { max-width: 40rem; color: var(--ds-muted-foreground); }
.footer { display: flex; gap: 1rem; justify-content: space-between; padding: 2rem 0; border-top: 1px solid var(--ds-border); font-size: .85rem; }
@media (max-width: 600px) { .header { min-height: 65px; gap: 1rem; } .header nav { gap: .8rem; font-size: .85rem; } .footer { display: block; } }
@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
'''


def init_consumer(args: argparse.Namespace) -> None:
    root = args.root.resolve()
    root.mkdir(parents=True, exist_ok=True)
    config = {"schemaVersion": 1, "name": args.name.strip(), "brand": args.brand,
              "platform": args.platform, "surface": args.surface,
              "source": "BIMfabrik/ui-system"}
    validate_config(config)
    config_path = root / ".ui-system.json"
    if config_path.exists():
        raise ValueError("Consumer already enrolled. Use 'sync', not 'init', to preserve overrides")
    # Reserve every initial file before writing the first, to avoid partial collisions.
    expected = outputs(config)
    if args.surface == "product-site":
        expected["product-site/index.html"] = marketing_html(args.name, args.brand)
        expected["product-site/site.css"] = marketing_css()
    collisions = [rel for rel in expected if (root / rel).exists()]
    if collisions:
        raise ValueError("Refusing to overwrite pre-existing files: " + ", ".join(collisions))
    config_path.write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    sync(root, check=False)
    if args.surface == "product-site":
        for rel in ("product-site/index.html", "product-site/site.css"):
            dest = root / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(expected[rel], encoding="utf-8")
            print(f"STARTER {rel} (editable; not overwritten by sync)")
    print("Next: integrate generated tokens in the app's real UI and install receiver workflow for updates.")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Create or sync a shared BIMfabrik/Zree design identity")
    sub = parser.add_subparsers(dest="command", required=True)
    init = sub.add_parser("init", help="Enroll an existing or new project without overwriting product code")
    init.add_argument("--root", type=Path, required=True)
    init.add_argument("--name", required=True)
    init.add_argument("--brand", choices=("zree", "bimfabrik"), required=True)
    init.add_argument("--platform", choices=PLATFORMS, required=True)
    init.add_argument("--surface", choices=SURFACES, default="app")
    sync_cmd = sub.add_parser("sync", help="Update only generated tokens; no scenes, pages or native project files")
    sync_cmd.add_argument("--root", type=Path, required=True)
    sync_cmd.add_argument("--check", action="store_true", help="Fail when generated tokens are stale; no writes")
    args = parser.parse_args(argv)
    try:
        if args.command == "init":
            init_consumer(args)
            return 0
        return 0 if sync(args.root.resolve(), args.check) else 1
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        print(f"designctl: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
