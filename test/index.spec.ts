import { Kafka } from '../src/index'
import { ConsumerGroup } from './mock/consumer_group'
import { HighLevelProducer } from './mock/high_level_producer'
import { KafkaClient } from './mock/kafka_client';

it('Send payload correctly', async () => {
  const kafka = new Kafka('test', (message: string):void => {
    console.log('hallo')
  }, {
    groupId: ''
  }, {
    ConsumerGroupClass: ConsumerGroup,
    HighLevelProducerClass: HighLevelProducer,
    KafkaClientClass: KafkaClient
  })
  const payload = [{
    messages: 'hello',
    topic: 'test-topic',
  }]
  const data = await kafka.send(payload)
  expect(data).toBe(payload)
});
