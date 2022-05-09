import { Admin, AdminConfig, ITopicConfig, Kafka } from "kafkajs";


(async () => {
    try {
        const kafka: Kafka = new Kafka({
            clientId: 'myapp',
            brokers: [
                'localhost:9092'
            ]
        });

        const admin: Admin = kafka.admin({} as AdminConfig);
        console.info('connecting...');
        await admin.connect();
        console.info('connected!');
        await admin.createTopics({
            topics: [
                {
                    topic: "Users",
                    numPartitions: 2
                }
            ] as ITopicConfig[],
        });
        await admin.disconnect();
    } catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    }
})();



