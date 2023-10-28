import amqp from 'amqplib';


export class Consumer {
    constructor() { }

    public async consumeMessage() {
        try {

            const connection = await amqp.connect('amqps://yvloloiz:ZV36ZEDhVwTs7UIOCr3vsmBBWhrRGUeh@fish.rmq.cloudamqp.com/yvloloiz');
            const channel = await connection.createChannel();

            const exchange = 'myworker';
            const queue = 'users';
            const routingKey = 'usuario23';

            await channel.assertQueue(queue, { durable: true });

            await channel.bindQueue(queue, exchange, routingKey);

            console.log(" [x] Awaiting messages in %s", queue);

            return channel.consume(queue, (message) => {
                console.log(" [x] Awaiting messages in %s", message?.content.toString());
            }, {
                noAck: true
            })

        } catch (error) {
            console.error(error);
        }
    }
}
