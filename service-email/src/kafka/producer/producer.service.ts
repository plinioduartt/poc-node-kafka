import { Message, Producer, ProducerConfig, ProducerRecord } from "kafkajs";
import KafkaService from "../commons/kafka.service";
import IProducerKafkaService from "./producer.interface";

/**
 * Singleton pattern
 */
class ProducerKafkaService extends KafkaService implements IProducerKafkaService {
    private producer: Producer = {} as Producer;

    constructor() {
        super();
        this.producer = this.kafka.producer({} as ProducerConfig);
    }

    public async open(): Promise<void> {
        console.info(`connecting producer...`);
        const result = await this.producer.connect();
        console.info(`producer connected!!!`);
        return result;
    }

    public async close(): Promise<void> {
        console.info(`closing producer connection...`);
        const result = await this.producer.disconnect();
        console.info(`producer connection closed!!!`);
        return result;
    }

    public async send(topic: string | RegExp, messages: Message[]): Promise<void> {
        console.info(`sending event...`);
        await this.producer.send({
            topic,
            messages
        } as ProducerRecord);
        console.info(`event sent!!!`);
    }
}

export default new ProducerKafkaService();