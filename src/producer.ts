import { Kafka, Message, Producer, ProducerConfig, ProducerRecord } from "kafkajs";


(async () => {
    try {
        const kafka: Kafka = new Kafka({
            clientId: 'myapp',
            brokers: [
                'localhost:9092'
            ]
        });

        const producer: Producer = kafka.producer({} as ProducerConfig);
        console.info('connecting...');
        await producer.connect();
        console.info('connected!');
        await producer.send({
            topic: "Users",
            messages: [
                {
                    value: JSON.stringify({
                        name: 'Novo usuário',
                        value: {
                            id: 'asldnb2ui8ner2389dn32u8',
                            name: 'Plinio Duarte',
                            email: 'plinio.duartes@hotmail.com'
                        }
                    })
                }
            ] as Message[]
        } as ProducerRecord)
    } catch (error) {
        console.error(`Unexpected error ==> ${error}`);
    } finally {
        process.exit(0);
    }
})();



