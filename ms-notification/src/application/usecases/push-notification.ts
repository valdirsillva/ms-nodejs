import { NotificationRepository } from "../repositories/notification-repository";

export class PushNotification {
    constructor(
        private notificationRepository: NotificationRepository,
    ) { }

    async execute() {
        return await this.notificationRepository.getNotifications();
    }
}