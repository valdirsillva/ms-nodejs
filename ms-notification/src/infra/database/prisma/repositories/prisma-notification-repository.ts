import { prisma } from "../../prisma";
import { Notification } from "../../../../domain/notification";
import { NotificationRepository } from "../../../../application/repositories/notification-repository";

export class PrismaNotificationRepository implements NotificationRepository {
    async create(notify: Notification): Promise<void> {
        await prisma.notification.create({
            data: {
                id: notify.id,
                name: notify.name,
                userId: notify.userId,
                emailFrom: notify.emailFrom,
                emailTo: notify.emailTo,
                subject: notify.subject,
                statusEmail: notify.statusEmail,
            }
        })
    }

    async getNotifications(): Promise<{} | Notification[]> {
        const notifications = await prisma.notification.findMany();
        return notifications;
    }
}