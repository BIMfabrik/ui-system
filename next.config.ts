import type { NextConfig } from "next"

const isGitHubPages = process.env.GITHUB_ACTIONS === "true"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/ui-system" : "",
  assetPrefix: isGitHubPages ? "/ui-system/" : "",
  images: { unoptimized: true },
}

export default nextConfig
