import { Request, Response } from "express";
import { User } from "../../application/usecases/user";

export class CreateUserController {
    constructor(private user: User) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const data = req.body

        try {
            if (data.nome == '' && data.email)
                return res.status(400).json({ message: 'Nome e email devem ser preenchidos' })

            const user = await this.user.execute(data);

            return res.status(201).json(user);
        } catch (err: any) {
            console.error(err.message)
            return res.status(400).json({ message: 'Não foi possível criar o usuário', error: err.message })
        }
    }
}