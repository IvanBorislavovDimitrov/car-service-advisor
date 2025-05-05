import express from 'express';
import { CarService } from '../service/car-service';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const car = await CarService.addCar(req.body);
    res.status(201).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add car' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const cars = await CarService.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

export default router;