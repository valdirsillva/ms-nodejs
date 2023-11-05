
import { Request, Response } from 'express';
import { PushNotification } from "../../application/usecases/push-notification";
import { Notification } from '../../application/repositories/notification-repository';

export class GetNotificationController {
    constructor(private notification: PushNotification) { }

    async handle(req: Request, res: Response): Promise<Notification[] | {}> {
        try {
            const notifications = await this.notification.execute();

            if (Array.isArray(notifications) && notifications.length === 0) {
                return res.status(400).json({ message: 'Nenhuma notificação encontrada' })
            }

            return res.status(200).json(notifications)

        } catch (err: any) {
            console.error(err.message)
            return res.status(400).json({ message: 'Erro ao listar as notificações' })
        }
    }
}