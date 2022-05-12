import { ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";
import ServerInitializer from "./initializers/server.initializer";
import ConsumerKafkaService from "./kafka/consumer/consumer.service";
import IConsumerKafkaService from "./kafka/consumer/consumer.interface";

const topic: string | RegExp = 'ECOMMERCE_NEW_ORDER';
const params: ConsumerSubscribeTopics = {
    topics: [topic],
    fromBeginning: true
};

void (async () => {
    await ServerInitializer.start();

    /**
     * Dependency Injection
     */
    const consumerKafkaService: IConsumerKafkaService = new ConsumerKafkaService();
    /**
     * End of Dependency Injection
     */

    await consumerKafkaService.open();
    await consumerKafkaService.subscribe(params);
    await consumerKafkaService.handleEvents(handler);

    /**
     * Stop receive events of kafka consumer
     */
    // await consumerKafkaService.stopEvents();

    /**
     * Close connection with kafka producer
     */
    // await consumerKafkaService.close();
})();

function handler(data: EachMessagePayload) {
    console.log(`\n --------- NEW ORDER --------- \n`);
    console.log(`From topic: ${data.topic}`);
    console.log(`From partition: ${data.partition}`);
    console.log(`With data: ${data.message.value}`);
    console.log(`\n ----------------------------- \n`);
}