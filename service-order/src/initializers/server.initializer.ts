// import runConsumerKafkaInitializer from "./kafka-consumer.initializer";
import runProducerKafkaInitializer from "./kafka-producer.initializer";

class ServerInitializer {
    private constructor() { }

    static async start() {
        // await runConsumerKafkaInitializer();
        await runProducerKafkaInitializer();
    }
}

export default ServerInitializer;