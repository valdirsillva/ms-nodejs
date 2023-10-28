import { User } from "../../domain/user";

export interface UserData {
    name: string;
    email: string;
    phoneNumber: string;
}

export interface UserRepository {
    create(user: User): Promise<void>;
    getUsers(): Promise<UserData[]>;
    findById(email: string): Promise<User | null>;
}