import * as dotenv from 'dotenv'

import nodemailer, { TransportOptions } from 'nodemailer'
import { IMailAdapter, SendMailData } from './IMail-adapter'
dotenv.config()

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: 'ssl',
    auth: {
        user: 'valdir.developervs@gmail.com',
        pass: ''
    }
} as TransportOptions)

export class NodemailerMailAdapter implements IMailAdapter {
    async sendMail({ name, email }: SendMailData) {
        await transport.sendMail({
            from: process.env.SMTP_SENDER,
            to: email,
            cc: 'valdir.developervs@gmail.com',
            subject: 'NOTIFICAÇÃO: Confirmação de cadastro',
            html: `Olá <b>${name}</b>, seja muito bem-vindo à nossa plataforma! <br/><br/>

            Estamos contente em te receber!!<br/><br/>

            Atenciosamente, <br/><br/>

            Equipe OneTo
            `,
        })
    }
}