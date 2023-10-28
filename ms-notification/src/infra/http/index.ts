import 'dotenv/config';

import express, { Request, Response } from 'express';
import { Consumer } from '../messaging/rabbitMQ/consumer';

const app = express();

app.use(express.json())

app.get('/notifications', async (request: Request, response: Response) => {

    const notify = new Consumer();

    const data = await notify.consumeMessage();

    response.status(200).json(data);
})

app.listen(3001, () => {
    console.log('[Notification service] service running');
})