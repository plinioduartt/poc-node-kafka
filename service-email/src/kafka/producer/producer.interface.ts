import { Message } from "kafkajs";

interface IProducerKafkaService {
    open(): Promise<void>;
    close(): Promise<void>;
    send(topic: string | RegExp, messages: Message[]): Promise<void>;
}

export default IProducerKafkaService;