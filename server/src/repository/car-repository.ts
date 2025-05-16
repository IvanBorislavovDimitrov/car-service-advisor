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

  static async findById(id: number): Promise<Car | null> {
    const result = await client.query('SELECT * FROM car WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, updates: Car): Promise<Car | null> {
    const { brand, model, vin, mileage, ownerId } = updates;
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 2;

    if (brand !== undefined) {
      fields.push(`brand = $${idx++}`);
      values.push(brand);
    }
    if (model !== undefined) {
      fields.push(`model = $${idx++}`);
      values.push(model);
    }
    if (vin !== undefined) {
      fields.push(`vin = $${idx++}`);
      values.push(vin);
    }
    if (mileage !== undefined) {
      fields.push(`mileage = $${idx++}`);
      values.push(mileage);
    }
    if (ownerId !== undefined) {
      fields.push(`owner_id = $${idx++}`);
      values.push(ownerId);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = fields.join(', ');
    const query = `UPDATE car SET ${setClause} WHERE id = $1 RETURNING *`;
    const result = await client.query(query, [id, ...values]);
    return result.rows[0] || null;
  }
}