import express, { Router } from 'express';
import { ObligationService } from '../service/obligation-service';

const router: Router = express.Router();

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

// Get obligation by id
router.get('/:id', (req, res) => {
    (async () => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid obligation id' });
            }
            const obligation = await ObligationService.getObligationById(id);
            if (!obligation) {
                return res.status(404).json({ error: 'Obligation not found' });
            }
            res.json(obligation);
        } catch (error: any) {
            res.status(400).json({ error: error && error.message ? error.message : 'Failed to fetch obligation' });
        }
    })();
});

// Update obligation by id
router.put('/:id', (req, res) => {
    (async () => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid obligation id' });
            }
            const updates = req.body;
            const updated = await ObligationService.updateObligation(id, updates);
            if (!updated) {
                return res.status(404).json({ error: 'Obligation not found' });
            }
            res.json(updated);
        } catch (error: any) {
            console.error('Error updating obligation:', error);
            res.status(400).json({ error: error.message || 'Failed to update obligation' });
        }
    })();
});

export default router;