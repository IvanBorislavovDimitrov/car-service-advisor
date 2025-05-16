export class CarOwner {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        id?: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        }
}