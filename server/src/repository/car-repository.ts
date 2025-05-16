import client from '../db/db';
import { Car } from '../domain/car';

export class CarRepository {

  static async create(car: Car): Promise<Car> {
    const { brand, model, vin, mileage, ownerId } = car;
    const result = await client.query(
      'INSERT INTO car (brand, model, vin, mileage, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [brand, model, vin, mileage, ownerId]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<Car[]> {
    const result = await client.query('SELECT * FROM car ORDER BY id ASC');
    return result.rows;
  }
}