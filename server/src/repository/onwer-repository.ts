import client from '../db/db';
import { CarOwner } from '../domain/car-owner';

export class OwnerRepository {
  static async create(owner: CarOwner): Promise<CarOwner> {
    const { firstName, lastName, email } = owner;
    // Check for duplicate email (optional, for better error handling)
    const existing = await client.query('SELECT * FROM car_owner WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new Error('Owner with this email already exists');
    }
    const result = await client.query(
      'INSERT INTO car_owner (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      [firstName, lastName, email]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<CarOwner[]> {
    const result = await client.query('SELECT * FROM car_owner ORDER BY id ASC');
    return result.rows;
  }

  static async findById(id: number): Promise<CarOwner | null> {
    const result = await client.query('SELECT * FROM car_owner WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, updates: Partial<CarOwner>): Promise<CarOwner | null> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = fields.map((field, idx) => {
      // Convert camelCase to snake_case for DB columns
      const dbField = field === 'firstName' ? 'first_name'
        : field === 'lastName' ? 'last_name'
        : field;
      return `${dbField} = $${idx + 2}`;
    }).join(', ');

    const query = `UPDATE car_owner SET ${setClause} WHERE id = $1 RETURNING *`;
    const result = await client.query(query, [id, ...values]);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await client.query('DELETE FROM car_owner WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}