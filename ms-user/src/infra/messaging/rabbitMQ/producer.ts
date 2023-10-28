import amqp from 'amqplib';
import { User } from '../../../domain/user';


export class Producer {
    constructor() { }

    public async producerMessage(user: User) {
        try {

            const connection = await amqp.connect('amqps://yvloloiz:ZV36ZEDhVwTs7UIOCr3vsmBBWhrRGUeh@fish.rmq.cloudamqp.com/yvloloiz');
            const channel = await connection.createChannel();

            const exchange = 'myworker';
            await channel.assertExchange(exchange, 'direct', { durable: true });

            const queue = 'users';
            await channel.assertQueue(queue, {
                durable: true
            })

            const routingKey = 'usuario23'
            await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(user)));

            console.log(' [x] Send %s', JSON.stringify(user))

            await channel.close();
            await connection.close();
        } catch (error) {
            console.error(error);
        }
    }
}
