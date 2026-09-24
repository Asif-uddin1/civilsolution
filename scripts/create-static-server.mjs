import { mkdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(distDir, "public");
const serverEntry = `import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
const port = Number(process.env.PORT);
if (!port) throw new Error("PORT must be provided by the hosting environment");
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".ico": "image/x-icon" };

const server = createServer(async (request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const safePath = path.normalize(requestPath).replace(/^([.][.][/\\\\])+/, "");
  let filePath = path.join(root, safePath === "/" ? "index.html" : safePath);
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = path.join(filePath, "index.html");
    await access(filePath);
  } catch {
    filePath = path.join(root, "index.html");
  }
  response.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream", "Cache-Control": filePath.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable" });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "0.0.0.0", () => console.log("Civil Solution static server listening on port " + port));
`;

await mkdir(distDir, { recursive: true });
await copyFile(path.join(projectRoot, "client", "public", "_redirects"), path.join(publicDir, "_redirects")).catch(() => {});
await writeFile(path.join(distDir, "index.js"), serverEntry, "utf8");
