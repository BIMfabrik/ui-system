#!/usr/bin/env python3
"""Generate UPM design tokens from the canonical ZREE identity."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from designctl import profile, render_unity_cs, render_uss

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "unity" / "com.zree.ui" / "Runtime"


def generated() -> dict[Path, str]:
    identity = profile("zree")
    code = render_unity_cs(identity)
    code = code.replace("namespace BIMfabrik.DesignSystem", "namespace Zree.UI")
    return {
        OUT / "Scripts" / "CorporateDesignTokens.cs": code,
        OUT / "Styles" / "ZreeTheme.uss": render_uss(identity),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail if checked-in UPM colors drift")
    args = parser.parse_args()
    dirty = []
    for path, content in generated().items():
        if not path.exists() or path.read_text(encoding="utf-8") != content:
            dirty.append(path.relative_to(ROOT))
            if not args.check:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content, encoding="utf-8")
    if dirty:
        for path in dirty:
            print(f"{'DRIFT' if args.check else 'UPDATED'} {path}")
        return 1 if args.check else 0
    print("Unity UPM brand assets match design/zree.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
