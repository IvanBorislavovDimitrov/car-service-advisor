import { CarOwner } from '../domain/car-owner';
import { OwnerRepository } from '../repository/onwer-repository';

export class OwnerService {
  static async getAllOwners(): Promise<CarOwner[]> {
    return OwnerRepository.findAll();
  }

  static async createOwner(owner: CarOwner): Promise<CarOwner> {
    return OwnerRepository.create(owner);
  }

  static async updateOwner(id: number, updates: Partial<CarOwner>): Promise<CarOwner | null> {
    return OwnerRepository.update(id, updates);
  }

  static async getOwnerById(id: number): Promise<CarOwner | null> {
    return OwnerRepository.findById(id);
  }
}
