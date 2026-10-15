import type { NextConfig } from "next"

// One .env at the repository root serves both apps.
try {
  process.loadEnvFile("../../.env")
} catch {
  // No root .env (CI, or variables set by the host) — fall back to defaults.
}

const apiUrl = process.env.API_URL ?? "http://localhost:3001"

const nextConfig: NextConfig = {
  // Same origin for the browser: /api/* is forwarded to Elysia, so the Better
  // Auth cookie is first-party for both apps and no CORS setup is needed.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiUrl}/api/:path*` }]
  },
}

export default nextConfig
