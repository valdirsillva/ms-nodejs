import 'dotenv/config';
import express, { Request, Response } from 'express';
import { getNotificationsController } from '../controllers';
import { main } from '../messaging/rabbitMQ/consumer';

const app = express();
app.use(express.json());

main()

app.get('/notifications', async (request: Request, response: Response) => {
    return getNotificationsController.handle(request, response);
})

app.listen(3001, () => {
    console.log('[Notification service] service running');
})