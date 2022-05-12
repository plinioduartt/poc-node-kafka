import { ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";

interface IConsumerKafkaService {
    open(): Promise<void>;
    close(): Promise<void>;
    subscribe(subscriptions: ConsumerSubscribeTopics): Promise<void>;
    handleEvents(handler: (data: EachMessagePayload) => void): Promise<void>;
    stopEvents(): Promise<void>;
}

export default IConsumerKafkaService;