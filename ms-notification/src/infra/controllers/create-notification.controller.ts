import { Notification } from '../../application/usecases/notifications';
import { NodemailerMailAdapter } from '../adapters/nodemailer-mail-adapter';

export class CreateNotificationsController {
    constructor(
        private notification: Notification,
        private sendMailNotification: NodemailerMailAdapter
    ) { }

    async handle(data: any): Promise<void> {
        try {
            await this.notification.execute(data);

            await this.sendMailNotification.sendMail(data)
        } catch (err: any) {
            console.error(err.message)
        }
    }
}