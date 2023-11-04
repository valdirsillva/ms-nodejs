import { Request, Response } from 'express';
import { PurchaseUser } from "../../application/usecases/purchase-user";

// Liskov-substition Principe
export class PurchaseUserController {
    constructor(private purchaseUser: PurchaseUser) { }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.purchaseUser.get();
            if (users.length == 0) return res.status(400).json({ message: 'Nenhum usuário encontrado' })
            return res.status(200).json(users);
        } catch (err: any) {
            console.error(err.message)
            return res.status(400).json({ message: 'Nenhum usuário encontrado' })
        }
    }
}

