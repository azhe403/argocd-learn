const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Use morgan if available, otherwise fall back to a simple logger
let morgan;
try {
  morgan = require('morgan');
} catch (err) {
  morgan = null;
}

if (morgan) {
  // common combined-ish format with response time (ms)
  app.use(morgan(':remote-addr - :remote-user ":method :url" :status :res[content-length] - :response-time ms ":user-agent"'));
} else {
  // Simple request-logging middleware fallback
  app.use((req, res, next) => {
    const start = process.hrtime();
    const { method, url } = req;
    const ip = req.ip || (req.connection && req.connection.remoteAddress) || '-';
    const userAgent = req.headers['user-agent'] || '-';
    const reqLength = req.headers['content-length'] || '-';

    res.on('finish', () => {
      const [s, ns] = process.hrtime(start);
      const ms = (s * 1e3 + ns / 1e6).toFixed(3);
      const log = `${new Date().toISOString()} ${ip} "${method} ${url}" ${res.statusCode} ${reqLength} - ${ms} ms - ${userAgent}`;
      console.log(log);
    });

    next();
  });
}

app.get("/", (req, res) => {
  res.send("Hello from Node.js app via ArgoCD! 🚀");
});

// Only start the server when this file is run directly (makes it easier to require in tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}

module.exports = app;
