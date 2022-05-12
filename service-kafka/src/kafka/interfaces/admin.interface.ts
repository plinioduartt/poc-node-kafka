import { TopicType } from "../admin.service";

interface IAdminKafkaService {
    open(): Promise<void>;
    close(): Promise<void>;
    initializeTopics(topics: TopicType): Promise<boolean>;
}

export default IAdminKafkaService;