using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace Zree.UI.Editor
{
    /// <summary>Read-only, non-invasive entry points for UI Builder/AI workflows.</summary>
    public static class ZreeUIDesignValidator
    {
        const string Styles = "Packages/com.zree.ui/Runtime/Styles/";

        [MenuItem("Zree/UI/Validate Design Package")]
        public static void ValidatePackage()
        {
            var theme = AssetDatabase.LoadAssetAtPath<StyleSheet>(Styles + "ZreeTheme.uss");
            var controls = AssetDatabase.LoadAssetAtPath<StyleSheet>(Styles + "ZreeComponents.uss");
            if (theme == null || controls == null)
            {
                Debug.LogError("Zree UI: Package styles are missing. Check the pinned UPM dependency.");
                return;
            }
            var instructions = AssetDatabase.LoadAssetAtPath<TextAsset>(
                "Assets/ZreeUI/UnityAssistantInstructions.txt");
            if (instructions == null)
                Debug.LogWarning("Zree UI: No project-specific Unity AI instructions asset found. " +
                                 "Configure one for this game before AI-driven screen changes.");
            else
                Debug.Log("Zree UI: design package styles and project instruction asset are available.");
        }

        [MenuItem("Zree/UI/Locate Project Guidelines")]
        public static void LocateGuidelines()
        {
            var asset = AssetDatabase.LoadAssetAtPath<TextAsset>(
                "Assets/ZreeUI/UnityAssistantInstructions.txt");
            if (asset == null)
            {
                Debug.LogWarning("Zree UI: Install the game-specific guidelines in Assets/ZreeUI first.");
                return;
            }
            Selection.activeObject = asset;
            EditorGUIUtility.PingObject(asset);
        }
    }
}
