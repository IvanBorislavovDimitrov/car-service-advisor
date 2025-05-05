import express from 'express';
import path from 'path';
import { initDb } from './db/db';
import carRoutes from './route/car-routes';
import obligationRoutes from './route/obligation-routes';
import { runObligationCheck } from './cron/obligation-checker';

const app = express();
const PORT = 3000;

// Serve frontend build
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());
app.use('/api/cars', carRoutes);
app.use('/api/obligations', obligationRoutes);

app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from backend!' });
});

initDb().then(() => {
    app.listen(PORT, () => {
        runObligationCheck(); // Run once immediately on startup
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Failed to start server:', err);
});

