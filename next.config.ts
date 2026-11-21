import type { NextConfig } from "next";

/* PREVIEW_EXPORT=1 runs a static export, which scripts/build-preview.mjs uses
   to get the compiled CSS for the single-file preview. Normal builds are unaffected. */
const previewExport = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(previewExport ? { output: "export" as const, images: { unoptimized: true } } : {}),
  /* Static export cannot be combined with these two. */
  cacheComponents: !previewExport,
  partialPrefetching: !previewExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
