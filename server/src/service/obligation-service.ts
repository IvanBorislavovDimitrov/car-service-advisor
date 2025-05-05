import { Obligation } from '../domain/obligation';
import { ObligationRepository } from '../repository/obligation-repository';

export class ObligationService {
    static async createObligation(obligation: Obligation): Promise<Obligation> {
        // Add any business logic or validation here if needed
        return ObligationRepository.create(obligation);
    }

    static async getAllObligations(): Promise<Obligation[]> {
        return ObligationRepository.findAll();
    }

    static async getObligationById(id: number): Promise<Obligation | null> {
        return ObligationRepository.findById(id);
    }

    static async updateObligation(id: number, updates: Partial<Obligation>): Promise<Obligation | null> {
        // Add any validation or business logic here if needed
        return ObligationRepository.update(id, updates);
    }

    static async deleteObligation(id: number): Promise<boolean> {
        return ObligationRepository.delete(id);
    }
}