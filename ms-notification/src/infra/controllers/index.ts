// import { Consumer } from "../messaging/rabbitMQ/consumer";
import { Notification } from "../../application/usecases/notifications";
import { PushNotification } from "../../application/usecases/push-notification";
import { NodemailerMailAdapter } from "../adapters/nodemailer-mail-adapter";
import { GetNotificationController } from "./get-notifications.controller";
import { CreateNotificationsController } from "./create-notification.controller";
import { PrismaNotificationRepository } from "../database/prisma/repositories/prisma-notification-repository";

const prismaNotificationRepository = new PrismaNotificationRepository();

const notificationInstance = new PushNotification(
    prismaNotificationRepository,
);
const sendMail = new NodemailerMailAdapter()
const notification = new Notification(prismaNotificationRepository)

const getNotificationsController = new GetNotificationController(notificationInstance);
const createNotificationController = new CreateNotificationsController(notification, sendMail);

export { getNotificationsController, createNotificationController }
