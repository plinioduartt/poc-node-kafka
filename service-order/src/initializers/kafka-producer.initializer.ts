import IProducerKafkaService from "../kafka/producer/producer.interface";
import ProducerKafkaService from "../kafka/producer/producer.service";

async function runProducerKafkaInitializer(): Promise<void> {
    let producerKafkaService: IProducerKafkaService = {} as IProducerKafkaService;

    try {
        /**
         * Dependency Injection
         */
        producerKafkaService = ProducerKafkaService;
        /**
         * End of Dependency Injection
         */

        await producerKafkaService.open();
    }
    catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    }
    finally {
        // await producerKafkaService.close();
        // process.exit(0);
    }
}

export default runProducerKafkaInitializer;
