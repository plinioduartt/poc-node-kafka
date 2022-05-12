import crypto from 'node:crypto';
import { Consumer, ConsumerConfig, ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";
import KafkaService from '../commons/kafka.service';
import IConsumerKafkaService from './consumer.interface';

/**
 * Singleton pattern
 */
class ConsumerKafkaService extends KafkaService implements IConsumerKafkaService {
    private consumer: Consumer = {} as Consumer;

    constructor() {
        super();
        this.consumer = this.kafka.consumer({
            groupId: 'service-email'
        } as ConsumerConfig);
    }

    public async open(): Promise<void> {
        console.info(`connecting consumer...`);
        const result = await this.consumer.connect();
        console.info(`consumer connected!!!`);
        return result;
    }

    public async close(): Promise<void> {
        console.info(`closing consumer connection...`);
        const result = await this.consumer.disconnect();
        console.info(`consumer connection closed!!!`);
        return result;
    }

    public async subscribe(subscriptions: ConsumerSubscribeTopics): Promise<void> {
        console.info(`consumer subscribing to topics...`);
        const result = await this.consumer.subscribe(subscriptions);
        console.info(`new consumer subscribed!!!`);
        return result;
    }

    public async handleEvents(handler: (data: EachMessagePayload) => void): Promise<void> {
        await this.consumer.run({
            async eachMessage(data: EachMessagePayload): Promise<void> {
                return handler(data);
            },
        });
    };

    public async stopEvents(): Promise<void> {
        await this.consumer.stop();
        return;
    };
}

export default new ConsumerKafkaService();