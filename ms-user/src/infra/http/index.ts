import 'dotenv/config';

import express, { Request, Response } from 'express';
import { createUserController, getUserController } from '../controllers';
import { prisma } from '../database/prisma/prisma';
const app = express();

app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.status(200).json({ status: 'OK' });
})

app.get('/users', (request: Request, response: Response) => {
    // await prisma.user.deleteMany();
    return getUserController.handle(request, response);
})

app.post('/users', async (request: Request, response: Response) => {
    return createUserController.handle(request, response);
})

app.listen(3000, () => {
    console.log('[User service] service running');
})