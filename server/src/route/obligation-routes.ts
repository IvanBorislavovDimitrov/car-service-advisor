import express from 'express';
import { ObligationService } from '../service/obligation-service';

const router = express.Router();

// Create a new obligation
router.post('/', async (req, res) => {
    try {
        const obligation = await ObligationService.createObligation(req.body);
        res.status(201).json(obligation);
    } catch (err) {
        console.error('Error creating obligation:', err);
        res.status(500).json({ error: 'Failed to create obligation' });
    }
});

// Get all obligations
router.get('/', async (_req, res) => {
    try {
        const obligations = await ObligationService.getAllObligations();
        res.json(obligations);
    } catch (err) {
        console.error('Error fetching obligations:', err);
        res.status(500).json({ error: 'Failed to fetch obligations' });
    }
});


export default router;