// Refresh mutable main-channel Git packages explicitly; Unity records the resolved SHA.
#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEditor.PackageManager;
using UnityEditor.PackageManager.Requests;
using UnityEngine;

namespace Zree.UI.Editor
{
    public static class ZreeLatestPackageRefresh
    {
        private static readonly Queue<string> PendingUrls = new Queue<string>();
        private static AddRequest current;
        private static bool failed;

        [MenuItem("Zree/Packages/Refresh Latest Shared Packages")]
        public static void RefreshLatest()
        {
            if (current != null || PendingUrls.Count > 0)
            {
                Debug.LogWarning("ZREE: shared package refresh is already running.");
                return;
            }
            string manifestPath = Path.GetFullPath(
                Path.Combine(Application.dataPath, "../Packages/manifest.json"));
            if (!File.Exists(manifestPath))
            {
                Debug.LogError("ZREE: Unity package manifest not found: " + manifestPath);
                return;
            }
            string source = File.ReadAllText(manifestPath);
            string pattern = "\"(com\\.zree\\.[^\"]+)\"\\s*:\\s*\"(https://github\\.com/BIMfabrik/[^\" ]+\\.git(?:\\?path=/[^\" ]+)?#main)\"";
            MatchCollection matches = Regex.Matches(source, pattern);
            List<string> others = new List<string>();
            string ui = null;
            foreach (Match match in matches)
            {
                string name = match.Groups[1].Value;
                string url = match.Groups[2].Value;
                if (name == "com.zree.ui") ui = url;
                else others.Add(url);
            }
            // The shared Editor code lives in com.zree.ui: update that package last.
            foreach (string url in others) PendingUrls.Enqueue(url);
            if (ui != null) PendingUrls.Enqueue(ui);
            if (PendingUrls.Count == 0)
            {
                Debug.Log("ZREE: no main-channel Git dependencies to refresh.");
                return;
            }
            failed = false;
            EditorApplication.update += Tick;
            Tick();
        }

        private static void Tick()
        {
            if (current != null && !current.IsCompleted) return;
            if (current != null)
            {
                if (current.Status == StatusCode.Failure)
                {
                    failed = true;
                    Debug.LogError("ZREE: package refresh failed: " + current.Error.message);
                }
                else
                {
                    Debug.Log("ZREE: refreshed package " + current.Result.name +
                        " at resolved " + current.Result.version);
                }
                current = null;
            }
            if (PendingUrls.Count == 0)
            {
                EditorApplication.update -= Tick;
                Debug.Log(failed ? "ZREE: refresh finished with errors; inspect Package Manager." :
                    "ZREE: refreshed packages; record resolved Git hashes in release evidence.");
                return;
            }
            string next = PendingUrls.Dequeue();
            Debug.Log("ZREE: requesting latest upstream package: " + next);
            current = Client.Add(next);
        }
    }
}
#endif
