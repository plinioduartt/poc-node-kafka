import runKafkaService from "./kafka.initializer";

class ServerInitializer {
    private constructor() { }

    static async start() {
        await runKafkaService();
    }
}

export default ServerInitializer;