import crypto from "node:crypto";
import { Message } from "kafkajs";
import ServerInitializer from "./initializers/server.initializer";
import IProducerKafkaService from "./kafka/producer/producer.interface";
import ProducerKafkaService from "./kafka/producer/producer.service";

const topic: string | RegExp = 'ECOMMERCE_NEW_ORDER';

void (async () => {
    await ServerInitializer.start();

    /**
     * Dependency Injection
     */
    const producerKafkaService: IProducerKafkaService = new ProducerKafkaService();
    /**
     * End of Dependency Injection
     */

    await producerKafkaService.open();

    setInterval(async () => {
        const messages: Message[] = [
            {
                key: crypto.randomUUID(),
                value: JSON.stringify({
                    amount: Math.random() * 4999 + 1,
                    userId: crypto.randomUUID(),
                    description: `Product #000${Math.round(Math.random() * 4999 + 1)}`
                })
            }
        ];
        await producerKafkaService.send(topic, messages);
    }, 5000);

    /**
     * Close connection with kafka producer
     */
    // await producerKafkaService.close();
})();