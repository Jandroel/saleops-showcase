import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function safeJoin(base, requestPath) {
  const clean = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  return join(base, clean);
}

async function fileExists(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

function resolveRequest(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  let pathname = decodeURIComponent(parsed.pathname);

  if (pathname.startsWith("/assets/")) {
    return safeJoin(join(root, "public"), pathname);
  }

  if (pathname === "/") {
    return join(root, "index.html");
  }

  if (pathname.endsWith("/")) {
    return safeJoin(root, `${pathname}index.html`);
  }

  return safeJoin(root, pathname);
}

const server = createServer(async (req, res) => {
  try {
    const resolved = resolveRequest(req.url || "/");
    let target = resolved;

    if (!(await fileExists(target))) {
      target = join(root, "index.html");
    }

    const body = await readFile(target);
    const type = contentTypes[extname(target)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`SaleOps showcase server error:\n${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`SaleOps showcase running at http://localhost:${port}`);
});
