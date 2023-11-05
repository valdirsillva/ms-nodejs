import { Request, Response } from 'express';
import { User } from "../../application/usecases/user";

// Liskov-substition Principe
export class UserController {
    constructor(private user: User) { }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.user.get();
            if (users.length == 0) return res.status(400).json({ message: 'Nenhum usuário encontrado' })
            return res.status(200).json(users);
        } catch (err: any) {
            console.error(err.message)
            return res.status(400).json({ message: 'Nenhum usuário encontrado' })
        }
    }
}

