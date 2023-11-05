import { NotificationRepository } from "../repositories/notification-repository";
import { v4 as uuidv4 } from 'uuid';

interface UserNotification {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
}

export class Notification {
    constructor(
        private notificationRepository: NotificationRepository,
    ) { }

    async execute(data: UserNotification) {
        const notificationUUID = uuidv4();

        if (!data) {
            throw new Error('error')
        }

        const newNotification = {
            id: notificationUUID,
            name: data.name,
            userId: data.id,
            emailTo: data.email,
            emailFrom: 'valdirpiresba@gmail.com',
            subject: 'Usuário cadastrado com sucesso1',
            statusEmail: 'SENT'
        }

        await this.notificationRepository.create(newNotification);
    }
}