import 'dotenv/config';

import express, { Request, Response } from 'express';
import { createUserController, purchaseUserController } from '../controllers';
const app = express();

app.use(express.json())

app.get('/', (request: Request, response: Response) => {
    response.status(200).json({ status: 'OK' });
})

app.get('/users', (request: Request, response: Response) => {
    return purchaseUserController.handle(request, response);
})

app.post('/users', async (request: Request, response: Response) => {
    return createUserController.handle(request, response);
})

app.listen(3000, () => {
    console.log('[User service] service running');
})