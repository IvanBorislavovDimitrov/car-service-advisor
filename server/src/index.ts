import express from 'express';
import path from 'path';
import { initDb } from './db/db';
import carRoutes from './route/car-routes';

const app = express();
const PORT = 3000;

// Serve frontend build
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());
app.use('/api/cars', carRoutes);

app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from backend!' });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Failed to start server:', err);
});

