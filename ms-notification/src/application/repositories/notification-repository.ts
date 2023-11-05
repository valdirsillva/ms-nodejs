export interface ResponseError {
    message: string;
}

export interface Notification {
    id: string;
    name: string;
    userId: string;
    emailFrom: string;
    emailTo: string;
    subject: string;
    statusEmail: String;
}

export interface NotificationRepository {
    create(notify: Notification): Promise<void>;
    getNotifications(): Promise<Notification[] | {}>;
}
