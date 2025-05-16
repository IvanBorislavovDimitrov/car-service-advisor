import { Car } from '../domain/car';
import { CarRepository } from '../repository/car-repository';

export class CarService {
    static async addCar(car: Car): Promise<Car> {
        return CarRepository.create(car);
    }

    static async getAllCars(): Promise<Car[]> {
        return CarRepository.findAll();
    }

    static async getCarById(id: number): Promise<Car | null> {
        // @ts-ignore: findById will be implemented in CarRepository
        return CarRepository.findById(id);
    }
}