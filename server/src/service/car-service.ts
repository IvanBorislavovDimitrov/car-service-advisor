import { Car } from '../types/car';
import { CarRepository } from '../repository/car-repository';

export class CarService {
    static async addCar(car: Car): Promise<Car> {
        // Here you could add validations, duplicates check, etc.
        return CarRepository.create(car);
    }

    static async getAllCars(): Promise<Car[]> {
        return CarRepository.findAll();
    }
}