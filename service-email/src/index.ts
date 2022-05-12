import { ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";
import ServerInitializer from "./initializers/server.initializer";
import ConsumerKafkaService from "./kafka/consumer/consumer.service";
import IConsumerKafkaService from "./kafka/consumer/consumer.interface";

void (async () => {
    await ServerInitializer.start();

    /**
     * Dependency Injection
     */
    const consumerKafkaService: IConsumerKafkaService = ConsumerKafkaService;
    /**
     * End of Dependency Injection
     */

    const topic: string | RegExp = 'ECOMMERCE_NEW_ORDER';
    const params: ConsumerSubscribeTopics = {
        topics: [
            topic
        ],
        fromBeginning: true
    };

    await consumerKafkaService.subscribe(params);
    await consumerKafkaService.handleEvents(handler);
    // await consumerKafkaService.stopEvents();
})();

function handler(data: EachMessagePayload) {
    console.log(`\n --------- NEW ORDER --------- \n`);
    console.log(`From topic: ${data.topic}`);
    console.log(`From partition: ${data.partition}`);
    console.log(`With data: ${data.message.value}`);
    console.log(`\n ----------------------------- \n`);
}