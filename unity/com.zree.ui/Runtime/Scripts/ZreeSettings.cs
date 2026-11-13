using System;
using UnityEngine.UIElements;

namespace Zree.UI
{
    /// <summary>
    /// Shared visual structure for real UI Toolkit settings.
    /// App-specific code owns persistence, behavior, labels and audio/gameplay bindings.
    /// Styles must be loaded from ZreeTheme.uss and ZreeComponents.uss.
    /// </summary>
    public static class ZreeSettings
    {
        public const string RootClass = "ds-root";
        public const string DarkClass = "ds-dark";
        public const string UiClass = "zree-ui";

        public static void ApplyClasses(VisualElement root, bool dark)
        {
            if (root == null) throw new ArgumentNullException(nameof(root));
            root.AddToClassList(RootClass);
            root.AddToClassList(UiClass);
            root.EnableInClassList(DarkClass, dark);
        }

        public static VisualElement CreateSection(string name, string heading)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Section needs a stable, non-empty binding name.", nameof(name));

            var section = new VisualElement { name = name };
            section.AddToClassList("zree-section");
            var header = new Label(heading ?? string.Empty) { name = name + "-heading" };
            header.AddToClassList("zree-section__heading");
            section.Add(header);
            return section;
        }

        public static Toggle CreateToggle(string name, string label, bool current, Action<bool> onChanged)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Toggle needs a stable, non-empty binding name.", nameof(name));

            var toggle = new Toggle(label ?? string.Empty) { name = name };
            toggle.AddToClassList("zree-setting-toggle");
            toggle.SetValueWithoutNotify(current);
            if (onChanged != null)
                toggle.RegisterValueChangedCallback(evt => onChanged(evt.newValue));
            return toggle;
        }

        public static Slider CreateSlider(string name, string label, float min, float max, float current,
                                          Action<float> onChanged)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Slider needs a stable, non-empty binding name.", nameof(name));
            if (!(max > min))
                throw new ArgumentOutOfRangeException(nameof(max), "max must be greater than min");

            var slider = new Slider(label ?? string.Empty, min, max) { name = name };
            slider.AddToClassList("zree-setting-slider");
            slider.SetValueWithoutNotify(UnityEngine.Mathf.Clamp(current, min, max));
            if (onChanged != null)
                slider.RegisterValueChangedCallback(evt => onChanged(evt.newValue));
            return slider;
        }

        public static Button CreateButton(string name, string text, Action onClick)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Button needs a stable, non-empty binding name.", nameof(name));

            var button = new Button(onClick) { name = name, text = text ?? string.Empty };
            button.AddToClassList("zree-button");
            return button;
        }
    }
}
