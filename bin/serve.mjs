#!/usr/bin/env node

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split("?")[0]);
    if (reqPath === "/" || reqPath === "/index.html") {
      reqPath = "/public/index.html";
    }

    const filePath = path.join(ROOT_DIR, reqPath);

    // Sécurité anti directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Accès refusé");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "text/plain; charset=utf-8";
      res.writeHead(200, {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Fichier non trouvé : ${reqPath}`);
    }
  });
}

function listen(port) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Interface DevStandard UI en ligne !`);
    console.log(`👉 Ouvrez dans votre navigateur : http://localhost:${port}`);
    console.log(`======================================================\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      listen(port + 1);
    } else {
      console.error("Erreur serveur :", err);
    }
  });
}

listen(DEFAULT_PORT);
