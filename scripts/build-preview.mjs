// Builds preview/index.html: the whole site as one self-contained file, for
// sharing a preview link. Run: npm run preview:build
//
// The real site is the Next.js app. This preview renders the same page
// component in the browser, with the compiled site CSS, the scripts and the
// logos all inlined. Fonts load from Google Fonts.
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build } from "esbuild";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "out");
const preview = join(root, "preview");

// 1. Compiled CSS comes from a static export of the Next.js app.
execSync("npx next build", { cwd: root, stdio: "inherit", env: { ...process.env, PREVIEW_EXPORT: "1" } });
const chunks = join(out, "_next/static/chunks");
let css = readdirSync(chunks)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(chunks, f), "utf8"))
  .join("\n");
// Self-hosted font files are not shipped in the preview; Google Fonts serves them instead.
css = css.replace(/@font-face\s*{[^}]*}/g, "");
rmSync(out, { recursive: true, force: true });

// 2. One script bundle of the page.
const result = await build({
  entryPoints: [join(root, "scripts/preview/entry.tsx")],
  bundle: true,
  minify: true,
  write: false,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  tsconfig: join(root, "tsconfig.json"),
  alias: {
    "next/image": join(root, "scripts/preview/next-image.tsx"),
    "next/link": join(root, "scripts/preview/next-link.tsx"),
  },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "error",
});
let js = result.outputFiles[0].text;

// 3. Logos and photos become data URIs so the file stands alone.
for (const f of readdirSync(join(root, "public/assets"))) {
  const data = readFileSync(join(root, "public/assets", f)).toString("base64");
  const mime = f.endsWith(".jpg") ? "image/jpeg" : "image/png";
  js = js.replaceAll(`/assets/${f}`, `data:${mime};base64,${data}`);
}
js = js.replaceAll("</script", "<\\/script");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Selling with Social</title>
<meta name="description" content="Turn your social ads into booked customers. One system runs the ad, the page, the reply and the follow-up.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Figtree:wght@400..700&family=Geist+Mono:wght@400..600&display=swap">
<style>:root{--font-bricolage:"Bricolage Grotesque";--font-figtree:"Figtree";--font-geist-mono:"Geist Mono"}</style>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
</body>
</html>
`;
mkdirSync(preview, { recursive: true });
rmSync(join(preview, "_next"), { recursive: true, force: true });
rmSync(join(preview, "assets"), { recursive: true, force: true });
writeFileSync(join(preview, "index.html"), html);
console.log(`Preview written to preview/index.html (${Math.round(html.length / 1024)} KB)`);
