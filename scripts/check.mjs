import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const required = [
  "index.html",
  "public/assets/app.js",
  "public/assets/styles.css",
  "public/assets/mock-data.js",
  "public/assets/saleops-mark.svg",
  "public/assets/screenshots/storefront-desktop.webp",
  "public/assets/screenshots/dashboard-desktop.webp",
  "public/assets/screenshots/reports-desktop.webp",
  "public/assets/screenshots/pos-desktop.webp",
  "public/assets/screenshots/storefront-mobile.webp",
  "out/index.html",
  "out/demo/store/index.html",
  "out/demo/admin/index.html",
  "out/docs/index.html",
  "out/roadmap/index.html"
];

for (const file of required) {
  await access(join(root, file));
}

const publicNarrative = [
  await readFile(join(root, "index.html"), "utf8"),
  await readFile(join(root, "public/assets/app.js"), "utf8")
].join("\n");

const forbidden = [
  /fase\s+\d/i,
  /frontend privado completo/i,
  /backend futuro/i,
  /reportes avanzados?\s+(?:pendiente|futuro)/i
];

for (const pattern of forbidden) {
  if (pattern.test(publicNarrative)) {
    throw new Error(`Public narrative contains stale wording: ${pattern}`);
  }
}

console.log(`Checked ${required.length} critical showcase files and public wording.`);
