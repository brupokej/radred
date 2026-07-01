import type { Plugin } from "@docusaurus/types";
import http from "http";
import { WebSocketServer } from "ws";

export default function overlayServerPlugin(): Plugin {
  return {
    name: "overlay-server-plugin",
    configureWebpack(_config: object, isServer: boolean) {
      if (isServer) return;
      let currentState: object | null = null;

      const server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === "GET" && req.url === "/state") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(currentState));
          return;
        }

        if (req.method === "POST" && req.url === "/state") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              currentState = JSON.parse(body);
              const msg = JSON.stringify(currentState);
              for (const client of wss.clients) {
                if (client.readyState === 1) client.send(msg);
              }
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.writeHead(400);
              res.end("Bad JSON");
            }
          });
          return;
        }

        res.writeHead(404);
        res.end("Not found");
      });

      const wss = new WebSocketServer({ server });

      wss.on("connection", (ws) => {
        if (currentState !== null) ws.send(JSON.stringify(currentState));
      });

      server.on("error", (err: NodeJS.ErrnoException) => {
        if (err.code !== "EADDRINUSE") console.error("Overlay relay error:", err);
      });

      return {
        devServer: {
          setupMiddlewares: (middlewares: object[]) => {
            server.listen(3001, () => console.log("Overlay relay running on :3001"));
            return middlewares;
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    },
  };
}
