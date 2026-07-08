import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const outDir = join(root, "out");

const productSlugs = [
  "monitor-ultraview-27",
  "teclado-proline-mx",
  "mouse-aero-precision",
  "webcam-focus-4k",
  "audifonos-clarity-pro",
  "dock-usb-c-12-en-1",
  "laptop-novabook-air",
  "silla-ergo-flex",
  "pack-home-office-plus",
  "soporte-aluminio-laptop",
  "microfono-streamline",
  "escritorio-stand-fit"
];

const routes = [
  "/",
  "/demo/store/",
  "/demo/store/products/",
  "/demo/store/cart/",
  "/demo/store/checkout/",
  "/demo/store/order-success/",
  "/demo/admin/",
  "/demo/admin/products/",
  "/demo/admin/orders/",
  "/demo/admin/reports/",
  "/demo/admin/ai-insights/",
  "/docs/",
  "/roadmap/",
  ...productSlugs.map((slug) => `/demo/store/products/${slug}/`)
];

async function writeRoute(route, html) {
  const target = route === "/" ? join(outDir, "index.html") : join(outDir, route, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(join(root, "public", "assets"), join(outDir, "assets"), { recursive: true });

const html = await readFile(join(root, "index.html"), "utf8");
for (const route of routes) {
  await writeRoute(route, html);
}

console.log(`Built SaleOps static showcase in ${outDir}`);
console.log(`Generated ${routes.length} routes.`);
