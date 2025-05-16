import express, { Request, Response } from 'express';
import { CarService } from '../service/car-service';
import { OwnerService } from '../service/owner-service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const car = await CarService.addCar(req.body);
    res.status(201).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add car' });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const cars = await CarService.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// New endpoint to get all car owners
router.get('/owners', async (_req: Request, res: Response) => {
  try {
    const owners = await OwnerService.getAllOwners();
    res.json(owners);
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ error: 'Failed to fetch owners' });
  }
});

// New endpoint to create a car owner
router.post('/owners', async (req: Request, res: Response) => {
  try {
    const owner = await OwnerService.createOwner(req.body);
    res.status(201).json(owner);
  } catch (error: any) {
    console.error('Error creating owner:', error);
    res.status(400).json({ error: error.message || 'Failed to create owner' });
  }
});

// Update car owner by id
router.put('/owners/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updated = await OwnerService.updateOwner(id, updates);
    if (!updated) {
      res.status(404).json({ error: 'Owner not found' });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    console.error('Error updating owner:', error);
    res.status(400).json({ error: error.message || 'Failed to update owner' });
  }
});

// Get car owner by id
router.get('/owners/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const owner = await OwnerService.getOwnerById(id);
    if (!owner) {
      res.status(404).json({ error: 'Owner not found' });
      return;
    }
    res.json(owner);
  } catch (error: any) {
    console.error('Error updating owner:', error);
    res.status(400).json({ error: error.message || 'Failed to update owner' });
  }
});

export default router;