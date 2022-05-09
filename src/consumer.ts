import { Consumer, ConsumerConfig, EachMessageHandler, EachMessagePayload, ITopicConfig, Kafka } from "kafkajs";


(async () => {
    try {
        const kafka: Kafka = new Kafka({
            clientId: 'myapp',
            brokers: [
                'localhost:9092'
            ]
        });

        const consumer: Consumer = kafka.consumer({
            groupId: "teste"
        } as ConsumerConfig);
        console.info('connecting...');
        await consumer.connect();
        console.info('connected!');
        await consumer.subscribe({
            topic: "Users",
        });

        await consumer.run({
            async eachMessage({ message }: EachMessagePayload): Promise<void> {
                console.log(`Received message: ${message.value}`);
                console.log(`Parsed message: ${(message.value)}`);
                return;
            },
        })

    } catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    }
})();



