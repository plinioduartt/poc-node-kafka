import { ITopicConfig, Kafka, KafkaConfig } from "kafkajs";

const CLIENT_ID: string = 'ecommerce';
const BROKERS: string[] = ['localhost:9092'];

export type TopicType = {
    topics: ITopicConfig[];
};

class KafkaService {
    private kafkaProperties: KafkaConfig = {} as KafkaConfig;
    protected kafka: Kafka = {} as Kafka;

    constructor() {
        this.kafkaProperties = this.getProperties({} as KafkaConfig);
        this.kafka = new Kafka(this.kafkaProperties);
    }

    private getProperties(properties: KafkaConfig): KafkaConfig {
        Object.defineProperty(properties, 'clientId', this.getValueConfig<string>(CLIENT_ID));
        Object.defineProperty(properties, 'brokers', this.getValueConfig<string[]>(BROKERS));
        return properties;
    }

    private getValueConfig<T>(value: T): PropertyDescriptor {
        return { value, writable: false };
    }
}

export default KafkaService;




