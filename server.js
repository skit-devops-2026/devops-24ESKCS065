
const express = require("express");
const client = require("prom-client");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: "placetrack_http_requests_total",
  help: "Total HTTP requests received by PlaceTrack",
  labelNames: ["method", "route", "status"],
  registers: [register]
});

app.use((req, res, next) => {
  const originalEnd = res.end;

  res.end = function (...args) {
    httpRequests.inc({
      method: req.method,
      route: req.path,
      status: String(res.statusCode)
    });

    return originalEnd.apply(this, args);
  };

  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "PlaceTrack",
    commit: process.env.COMMIT_SHA || "local"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Do not expose server source or package metadata.
app.use((req, res, next) => {
  if (/^\/(server\.js|package(-lock)?\.json)$/.test(req.path)) {
    return res.sendStatus(404);
  }
  next();
});

app.use(express.static(path.join(__dirname), {
  dotfiles: "deny",
  index: "index.html"
}));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PlaceTrack running on port ${PORT}`);
});
