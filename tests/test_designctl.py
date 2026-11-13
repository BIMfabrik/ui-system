"""Focused integration tests for onboarding, deterministic sync and safety boundaries."""
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "designctl.py"

spec = importlib.util.spec_from_file_location("designctl", SCRIPT)
designctl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(designctl)


def command(*args):
    return subprocess.run([sys.executable, str(SCRIPT), *map(str, args)],
                          text=True, capture_output=True)


class DesignctlTest(unittest.TestCase):
    def test_zree_theme_matches_actual_corporate_palette(self):
        p = designctl.profile("zree")
        self.assertEqual(p["colors"]["light"]["background"], "#f4f5ef")
        self.assertEqual(p["colors"]["light"]["primary"], "#203b30")
        self.assertEqual(p["colors"]["light"]["accent"], "#d4efab")

    def test_init_web_product_site_and_check(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            result = command("init", "--root", root, "--name", "A & B", "--brand", "zree",
                             "--platform", "web", "--surface", "product-site")
            self.assertEqual(result.returncode, 0, result.stderr)
            html = (root / "product-site/index.html").read_text()
            self.assertIn("A &amp; B", html)
            self.assertIn('data-ds-brand="zree"', html)
            self.assertTrue((root / "product-site/site.css").is_file())
            self.assertEqual(command("sync", "--root", root, "--check").returncode, 0)
            self.assertEqual(command("init", "--root", root, "--name", "Again", "--brand", "zree",
                                     "--platform", "web").returncode, 2)

    def test_token_drift_and_repair_preserve_product_content(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            self.assertEqual(command("init", "--root", root, "--name", "Wakeski", "--brand", "zree",
                                     "--platform", "web", "--surface", "product-site").returncode, 0)
            page = root / "product-site/index.html"
            page.write_text(page.read_text().replace("What it does", "Real feature text"))
            theme = root / "ui-system/generated/theme.css"
            theme.write_text(theme.read_text().replace("#203b30", "#000000"))
            self.assertEqual(command("sync", "--root", root, "--check").returncode, 1)
            self.assertEqual(command("sync", "--root", root).returncode, 0)
            self.assertEqual(command("sync", "--root", root, "--check").returncode, 0)
            self.assertIn("Real feature text", page.read_text())

    def test_unity_does_not_replace_unmanaged_code(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            target = root / "Assets/ZreeUI/Generated/CorporateDesignTokens.cs"
            target.parent.mkdir(parents=True)
            target.write_text("// user-owned custom logic\n")
            result = command("init", "--root", root, "--name", "Bad Buggies", "--brand", "zree",
                             "--platform", "unity", "--surface", "game")
            self.assertEqual(result.returncode, 2)
            self.assertEqual(target.read_text(), "// user-owned custom logic\n")
            self.assertFalse((root / ".ui-system.json").exists())

    def test_unity_generated_code_and_uss(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            result = command("init", "--root", root, "--name", "Bad Buggies", "--brand", "zree",
                             "--platform", "unity", "--surface", "game")
            self.assertEqual(result.returncode, 0, result.stderr)
            code = (root / "Assets/ZreeUI/Generated/CorporateDesignTokens.cs").read_text()
            uss = (root / "Assets/ZreeUI/Generated/CorporateDesignTokens.uss").read_text()
            self.assertIn("namespace BIMfabrik.DesignSystem", code)
            self.assertIn("new Color32(32, 59, 48, 255)", code)
            self.assertIn("--ds-primary: #203b30;", uss)
            self.assertIn(".ds-dark", uss)
            self.assertEqual(command("sync", "--root", root, "--check").returncode, 0)

    def test_swiftui_godot_and_bimfabrik_conversions(self):
        for platform, file in (("swiftui", "DesignSystem/Generated/CorporateDesignTokens.swift"),
                               ("godot", "addons/zree_ui/generated/design_tokens.json")):
            with self.subTest(platform=platform), tempfile.TemporaryDirectory() as d:
                root = Path(d)
                result = command("init", "--root", root, "--name", "Turemi", "--brand", "zree",
                                 "--platform", platform)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertIn("BIMfabrik/ui-system designctl", (root / file).read_text())
                self.assertEqual(command("sync", "--root", root, "--check").returncode, 0)
        self.assertEqual(designctl.rgb("oklch(1 0 0)"), (255, 255, 255))
        self.assertEqual(designctl.rgb("oklch(0 0 0)"), (0, 0, 0))

    def test_bimfabrik_all_adapters_with_css_alpha(self):
        for platform in ("web", "swiftui", "unity", "godot"):
            with self.subTest(platform=platform), tempfile.TemporaryDirectory() as d:
                root = Path(d)
                result = command("init", "--root", root, "--name", "Office", "--brand", "bimfabrik",
                                 "--platform", platform)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual(command("sync", "--root", root, "--check").returncode, 0)

    def test_invalid_platform_surface_does_not_write(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            result = command("init", "--root", root, "--name", "Invalid", "--brand", "zree",
                             "--platform", "swiftui", "--surface", "product-site")
            self.assertEqual(result.returncode, 2)
            self.assertFalse((root / ".ui-system.json").exists())

    def test_symlink_is_not_overwritten(self):
        with tempfile.TemporaryDirectory() as d, tempfile.TemporaryDirectory() as outer:
            root = Path(d)
            self.assertEqual(command("init", "--root", root, "--name", "Project", "--brand", "zree",
                                     "--platform", "web").returncode, 0)
            guarded = Path(outer) / "external.css"
            guarded.write_text("untouched")
            target = root / "ui-system/generated/theme.css"
            target.unlink()
            target.symlink_to(guarded)
            self.assertEqual(command("sync", "--root", root).returncode, 2)
            self.assertEqual(guarded.read_text(), "untouched")


if __name__ == "__main__":
    unittest.main()
