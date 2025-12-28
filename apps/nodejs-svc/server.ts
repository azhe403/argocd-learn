import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { hostname } from 'os';

const app = express();
const port = process.env.PORT || 3000;
const hostName = process.env.HOSTNAME || hostname();

try {
    app.use(morgan(`:remote-addr - :remote-user ":method :url" :status :res[content-length] - :response-time ms ":user-agent"`));
} catch (err) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        const start = process.hrtime();
        const { method, url } = req;
        const ip = req.ip || (req.connection && req.connection.remoteAddress) || '-';
        const userAgent = req.headers['user-agent'] || '-';
        const reqLength = req.headers['content-length'] || '-';

        res.on('finish', () => {
            const [s, ns] = process.hrtime(start);
            const ms = (s * 1e3 + ns / 1e6).toFixed(3);
            const log = `${new Date().toISOString()} ${hostName} ${ip} "${method} ${url}" ${res.statusCode} ${reqLength} - ${ms} ms - ${userAgent}`;
            console.log(log);
        });

        next();
    });
}

app.get("/", (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "Hello from Node.js app via ArgoCD! 🚀"
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App running on port ${port} and from ${hostName}`);
    });
}

export default app;
