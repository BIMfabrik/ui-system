"""Contract tests for the versioned Unity UPM package (no Unity required)."""
from __future__ import annotations

import importlib.util
import json
import re
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PKG = ROOT / "unity" / "com.zree.ui"
SCRIPTS = ROOT / "scripts"


class UnityPackageTests(unittest.TestCase):
    def test_manifest_valid_and_unity_6(self):
        data = json.loads((PKG / "package.json").read_text())
        self.assertEqual(data["name"], "com.zree.ui")
        self.assertEqual(data["unity"], "6000.0")
        self.assertRegex(data["version"], r"^\d+\.\d+\.\d+$")

    def test_generated_tokens_exactly_match_corporate_source(self):
        spec = importlib.util.spec_from_file_location(
            "export_unity_package", SCRIPTS / "export_unity_package.py")
        sys_path = __import__("sys").path
        sys_path.insert(0, str(SCRIPTS))
        try:
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            for path, content in module.generated().items():
                self.assertEqual(path.read_text(), content)
        finally:
            sys_path.remove(str(SCRIPTS))

    def test_reusable_styles_are_scoped_and_token_backed(self):
        styles = (PKG / "Runtime" / "Styles" / "ZreeComponents.uss").read_text()
        self.assertNotRegex(styles, r"(?m)^\s*\.(?:settings|hud)-")
        self.assertIn("var(--ds-", styles)
        for cls in ("zree-section", "zree-setting-toggle", "zree-setting-slider", "zree-button"):
            self.assertIn("." + cls, styles)

    def test_sample_uxml_has_real_package_sources(self):
        root = ET.parse(PKG / "Samples~" / "SettingsExample" / "ExampleSettings.uxml").getroot()
        ns = "{UnityEngine.UIElements}"
        refs = [e.attrib.get("src") for e in root.findall(ns + "Style")]
        self.assertIn("/Packages/com.zree.ui/Runtime/Styles/ZreeTheme.uss", refs)
        self.assertIn("/Packages/com.zree.ui/Runtime/Styles/ZreeComponents.uss", refs)
        self.assertTrue(root.find(".//" + ns + "Toggle") is not None)

    def test_editor_only_references_do_not_leak_into_runtime(self):
        runtime = (PKG / "Runtime" / "Scripts" / "ZreeSettings.cs").read_text()
        self.assertNotIn("using UnityEditor;", runtime)
        self.assertIn("SetValueWithoutNotify", runtime)
        self.assertIn("RegisterValueChangedCallback", runtime)

    def test_generated_csharp_uses_zree_namespace(self):
        code = (PKG / "Runtime" / "Scripts" / "CorporateDesignTokens.cs").read_text()
        self.assertIn("namespace Zree.UI", code)
        self.assertIn("ChildGameTouchTarget = 56", code)

    def test_meta_files_have_unique_valid_guids(self):
        seen = set()
        for path in PKG.rglob("*.meta"):
            data = path.read_text()
            match = re.search(r"(?m)^guid: ([0-9a-f]{32})$", data)
            self.assertIsNotNone(match, str(path))
            self.assertNotIn(match.group(1), seen)
            seen.add(match.group(1))
        for path in (PKG / "Runtime").rglob("*"):
            if path.is_file() and not path.name.endswith(".meta"):
                self.assertTrue(Path(str(path) + ".meta").is_file(), str(path))


if __name__ == "__main__":
    unittest.main()
