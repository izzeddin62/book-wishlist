import { UserDTO } from "./backend/User.backend";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor({ id, firstName, lastName, email }: UserDTO) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}