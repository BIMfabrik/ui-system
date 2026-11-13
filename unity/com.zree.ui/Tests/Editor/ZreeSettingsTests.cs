using NUnit.Framework;
using UnityEngine.UIElements;

namespace Zree.UI.Tests
{
    public sealed class ZreeSettingsTests
    {
        [Test]
        public void SectionHasStableHeaderAndSharedClass()
        {
            var section = ZreeSettings.CreateSection("graphics", "GRAPHICS");
            Assert.AreEqual("graphics", section.name);
            Assert.IsTrue(section.ClassListContains("zree-section"));
            Assert.AreEqual("GRAPHICS", section.Q<Label>("graphics-heading").text);
        }

        [Test]
        public void ToggleHasStableNameAndInitialState()
        {
            var toggle = ZreeSettings.CreateToggle("graphics-shadows", "Shadows", true, null);
            Assert.AreEqual("graphics-shadows", toggle.name);
            Assert.IsTrue(toggle.value);
            Assert.IsTrue(toggle.ClassListContains("zree-setting-toggle"));
        }

        [Test]
        public void SliderClampsInitialValue()
        {
            var slider = ZreeSettings.CreateSlider("volume", "Volume", 0f, 1f, 3f, null);
            Assert.AreEqual(1f, slider.value);
            Assert.IsTrue(slider.ClassListContains("zree-setting-slider"));
        }

        [Test]
        public void ThemeClassCanChangeWithoutReplacingUI()
        {
            var root = new VisualElement();
            ZreeSettings.ApplyClasses(root, true);
            Assert.IsTrue(root.ClassListContains(ZreeSettings.DarkClass));
            ZreeSettings.ApplyClasses(root, false);
            Assert.IsFalse(root.ClassListContains(ZreeSettings.DarkClass));
        }
    }
}
