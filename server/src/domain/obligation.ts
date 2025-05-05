export class Obligation {
    id?: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    carId: number;
  
    constructor(
      name: string,
      description: string,
      startDate: Date,
      endDate: Date,
      status: string,
      carId: number,
      id?: number
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
      this.carId = carId;
    }
  }