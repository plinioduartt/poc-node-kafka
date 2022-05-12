import ConsumerKafkaService from "../kafka/consumer/consumer.service";
import IConsumerKafkaService from "../kafka/consumer/consumer.interface";

async function runConsumerKafkaInitializer(): Promise<void> {
    let consumerKafkaService: IConsumerKafkaService = {} as IConsumerKafkaService;

    try {
        /**
         * Dependency Injection
         */
        consumerKafkaService = ConsumerKafkaService;
        /**
         * End of Dependency Injection
         */

        await consumerKafkaService.open();
    }
    catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    }
    finally {
        // await consumerKafkaService.close();
        // process.exit(0);
    }
}

export default runConsumerKafkaInitializer;
