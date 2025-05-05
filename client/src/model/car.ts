export class Car {
    id: number;
    brand: string;
    model: string;
    vin: string;
    mileage: number;

    constructor(id: number, brand: string, model: string, vin: string, mileage: number) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.vin = vin;
        this.mileage = mileage;
    }
};


