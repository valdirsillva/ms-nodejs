import { prisma } from "../prisma";
import { User } from "../../../../domain/user";
import { UserRepository, UserData } from "../../../../application/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        })
    }

    async getUsers(): Promise<UserData[]> {
        const data = await prisma.user.findMany();

        return data;
    }

    async findById(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                name: true, email: true, phoneNumber: true
            }
        })

        if (!user) {
            return null;
        }

        return new User({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }, user.email);
    }
}