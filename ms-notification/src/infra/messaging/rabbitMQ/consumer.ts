import amqp from 'amqplib';
import { CreateNotificationsController } from '../../controllers/create-notification.controller';
import { createNotificationController } from '../../controllers';

const urlRabbitMQ = 'amqps://yvloloiz:ZV36ZEDhVwTs7UIOCr3vsmBBWhrRGUeh@fish.rmq.cloudamqp.com/yvloloiz'
const queueName = 'users'

export async function main() {
    try {
        const connection = await amqp.connect(urlRabbitMQ);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });

        console.log(`Escutando a fila: ${queueName}`);

        channel.consume(queueName, (message) => {
            if (message !== null) {
                const content = message.content.toString();
                const jsonData = JSON.parse(content);

                console.log(`Mensagem recebida: ${content}`);
                channel.ack(message); // Confirme o recebimento da mensagem
                // Salva dados da notificação no banco de dados
                createNotificationController.handle(jsonData);
            }
        });
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
    }
}


// interface ConsumerResponse {
//     id: string;
//     name: string;
//     email: string;
//     phoneNumber?: string;
// }

// export class Consumer {
//     constructor() { }

//     public async consumeMessage(): Promise<ConsumerResponse | undefined> {
//         try {

//             const connection = await amqp.connect('');
//             const channel = await connection.createChannel();

//             const exchange = 'myworker';
//             const queue = 'users';
//             const routingKey = 'usuario23';

//             await channel.assertQueue(queue, { durable: true });

//             await channel.bindQueue(queue, exchange, routingKey);

//             // console.log(" [x] Awaiting messages in %s", queue);

//             return new Promise((resolve, reject) => {
//                 channel.consume(queue, async (message) => {
//                     if (message) {
//                         const content = message?.content.toString();
//                         const jsonData = JSON.parse(content);
//                         resolve(jsonData)
//                     }

//                     reject(null)

//                     // console.log(" [x] Awaiting messages in %s", message?.content.toString());
//                 }, {
//                     noAck: true
//                 })
//             })


//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
