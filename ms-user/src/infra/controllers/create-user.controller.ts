import { Request, Response } from "express";
import { PurchaseUser } from "../../application/usecases/purchase-user";

export class CreateUserController {
    constructor(private purchaseUser: PurchaseUser) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const data = req.body

        try {
            if (data.nome == '' && data.email)
                return res.status(400).json({ message: 'Nome e email devem ser preenchidos' })

            const user = await this.purchaseUser.execute(data);

            return res.status(201).json(user);
        } catch (err: any) {
            console.error(err.message)
            return res.status(400).json({ message: 'Não foi possível criar o usuário', error: err.message })
        }
    }
}