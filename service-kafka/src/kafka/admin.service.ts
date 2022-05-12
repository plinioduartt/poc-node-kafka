import { Admin, AdminConfig, ITopicConfig } from "kafkajs";
import IAdminKafkaService from "./interfaces/admin.interface";
import KafkaService from "./commons/kafka.service";

export type TopicType = {
    topics: ITopicConfig[];
};

/**
 * Singleton pattern
 */
class AdminKafkaService extends KafkaService implements IAdminKafkaService {
    private admin: Admin = {} as Admin;

    constructor() {
        super();
        this.admin = this.kafka.admin({
            retry: process.env.KAFKA_ADMIN_RETRY
        } as AdminConfig);
    }

    public async open(): Promise<void> {
        console.info(`connecting admin service...`);
        const result = await this.admin.connect();
        console.info(`admin service connected!!!`);
        return result;
    }

    public async close(): Promise<void> {
        console.info(`closing admin service connection...`);
        const result = await this.admin.disconnect();
        console.info(`admin service connection closed!!!`);
        return result;
    }

    public async initializeTopics(topics: TopicType): Promise<boolean> {
        console.info(`initializing topics...`);
        const result = await this.admin.createTopics(topics);
        console.info(`topics initialized!!!`);
        return result;
    }
}

export default new AdminKafkaService();