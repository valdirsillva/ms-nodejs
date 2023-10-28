import 'dotenv/config';

import express, { Request, Response } from 'express';
import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository';
import { PurchaseUser } from '../../application/usecases/purchase-user';
import { Producer } from '../messaging/rabbitMQ/producer';

const app = express();

app.use(express.json())

const prismaUserRepository = new PrismaUserRepository();
const messageQueue = new Producer()

const purchaseUser = new PurchaseUser(prismaUserRepository, messageQueue);

app.get('/', (request: Request, response: Response) => {
    response.status(200).json({ status: 'OK' });
})

app.get('/users', async (request: Request, response: Response) => {

    try {
        const users = await purchaseUser.get();

        return response.status(200).json(users);
    } catch (err) {
        console.error(err)

        return response.status(400).json({
            message: 'no users found'
        })
    }
})

app.post('/users', async (request: Request, response: Response) => {

    const { name, email, phoneNumber } = request.body

    try {
        await purchaseUser.execute({
            name, email, phoneNumber
        })

        return response.status(201).json({
            message: 'Usuário criado'
        })

    } catch (err) {
        console.error(err)

        return response.status(400).json({
            error: 'Error while creating a new user'
        })
    }
})

app.listen(3000, () => {
    console.log('[User service] service running');
})