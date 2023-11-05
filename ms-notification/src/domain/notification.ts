import crypto from 'node:crypto';

interface NotificationProps {
    name: string;
    userId: string;
    emailFrom: string;
    emailTo: string;
    subject: string;
    statusEmail: string;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: NotificationProps, id?: string) {
        this.props = { ...props }
        this._id = id ?? crypto.randomUUID();
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this.props.name;
    }

    public get userId(): string {
        return this.props.userId;
    }

    public get emailFrom(): string {
        return this.props.emailFrom;
    }

    public get emailTo(): string {
        return this.props.emailTo;
    }

    public get subject(): string {
        return this.props.subject;
    }

    public get statusEmail() {
        return this.props.statusEmail;
    }
}