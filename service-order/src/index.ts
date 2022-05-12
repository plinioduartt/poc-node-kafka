import crypto from "node:crypto";
import { Message } from "kafkajs";
import ServerInitializer from "./initializers/server.initializer";
import IProducerKafkaService from "./kafka/producer/producer.interface";
import ProducerKafkaService from "./kafka/producer/producer.service";

void (async () => {
    await ServerInitializer.start();

    /**
     * Dependency Injection
     */
    const producerKafkaService: IProducerKafkaService = ProducerKafkaService;
    /**
     * End of Dependency Injection
     */

    const topic: string | RegExp = 'ECOMMERCE_NEW_ORDER';

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
})();