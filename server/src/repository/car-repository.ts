import client from '../db/db';
import { Car } from '../types/car';

export class CarRepository {

  static async create(car: Car): Promise<Car> {
    const { brand, model, vin, mileage } = car;
    const result = await client.query(
      'INSERT INTO car (brand, model, vin, mileage) VALUES ($1, $2, $3, $4) RETURNING *',
      [brand, model, vin, mileage]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<Car[]> {
    const result = await client.query('SELECT * FROM car ORDER BY id DESC');
    return result.rows;
  }
}