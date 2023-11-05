import { v4 as uuidv4 } from 'uuid';
import { Producer } from "../../infra/messaging/rabbitMQ/producer";
import { UserRepository } from "../repositories/user-repository";

interface UserRequest {
    name: string;
    email: string;
    phoneNumber: string;
}

export class User {
    public constructor(
        private userRepository: UserRepository,
        private messageQueue: Producer
    ) { }

    async execute({ name, email, phoneNumber }: UserRequest): Promise<void> {
        const user = await this.userRepository.findById(email);

        const userExists = !!user;

        if (userExists) {
            throw new Error('User does not exists');
        }

        const id = uuidv4()

        const newUser: any = {
            id, name, email, phoneNumber
        }

        await this.userRepository.create(newUser);

        // 
        await this.messageQueue.producerMessage(newUser);

        // await this.messagingAdapter.sendMessage()
    }

    async get() {
        const users = await this.userRepository.getUsers()

        if (!users) {
            throw new Error('No users found')
        }

        return users;
    }
}  