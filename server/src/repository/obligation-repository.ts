import client from '../db/db';
import { Obligation } from '../domain/obligation';

export class ObligationRepository {

    static async create(obligation: Obligation): Promise<Obligation> {
        const { name, description, startDate, endDate, status, carId } = obligation;
        const result = await client.query(
            `INSERT INTO obligation (name, description, start_date, end_date, status, car_id) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, description, startDate, endDate, status, carId]
        );
        return result.rows[0];
    }

    static async findAll(): Promise<Obligation[]> {
        const result = await client.query('SELECT * FROM obligation ORDER BY id ASC');
        return result.rows;
    }

    static async findById(id: number): Promise<Obligation | null> {
        const result = await client.query('SELECT * FROM obligation WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    static async update(id: number, obligation: Partial<Obligation>): Promise<Obligation | null> {
        const fields = Object.keys(obligation);
        const values = Object.values(obligation);

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const query = `UPDATE obligation SET ${setClause} WHERE id = $1 RETURNING *`;

        const result = await client.query(query, [id, ...values]);
        return result.rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const result = await client.query('DELETE FROM obligation WHERE id = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}