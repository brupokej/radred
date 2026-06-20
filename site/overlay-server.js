// @ts-check
const http = require("http");
const { WebSocketServer } = require("ws");

/** @type {object | null} */
let currentState = null;

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
        const update = JSON.parse(body);
        currentState = { ...currentState, ...update };
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
  // Send current state immediately on connect so overlay loads without waiting
  if (currentState !== null) {
    ws.send(JSON.stringify(currentState));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Overlay relay running on :${PORT}`);
  console.log(`  GET  http://localhost:${PORT}/state`);
  console.log(`  POST http://localhost:${PORT}/state`);
  console.log(`  WS   ws://localhost:${PORT}`);
});
