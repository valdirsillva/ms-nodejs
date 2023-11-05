export interface SendMailData {
    name: string;
    email: string;
}

export interface IMailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}