import IAdminKafkaService from "../kafka/interfaces/admin.interface";
import AdminKafkaService, { TopicType } from "../kafka/admin.service";

const topicsToCreate: TopicType = {
    topics: [
        {
            topic: "ECOMMERCE_NEW_ORDER",
            numPartitions: 3
        },
    ]
};

/**
 * Start all the kafka services and create the topics
 */
async function runKafkaService(): Promise<void> {
    let kafkaService: IAdminKafkaService = {} as IAdminKafkaService;

    try {
        /**
         * Dependency Injection
         */
        kafkaService = AdminKafkaService;
        /**
         * End of Dependency Injection
         */

        await kafkaService.open();
        const topicsCreatedSuccesfully = await kafkaService.initializeTopics(topicsToCreate);

        if (!topicsCreatedSuccesfully) {
            throw new Error("Erro ao criar tópicos...");
        }
    }
    catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    }
    finally {
        // await kafkaService.close();
        // process.exit(0);
    }
};

export default runKafkaService;