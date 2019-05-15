import { ConsumerGroupOptions, ProduceRequest } from "kafka-node";
import { ConsumerGroup } from './kafka/consumer_group';
import { HighLevelProducer } from './kafka/high_level_producer';
import { IConsumerGroup } from "./kafka/interfaces/consumer_group";
import { IHighLevelProducer } from "./kafka/interfaces/high_level_producer";
import { KafkaClient } from "./kafka/kafka_client";
import { Class } from "./types/class";

let client: KafkaClient
let producer: IHighLevelProducer
let producerReady = false

export class Kafka {
  protected producer: IHighLevelProducer
  protected consumerGroup: IConsumerGroup

  public constructor (
    topic: string,
    onMessage: (message: string) => void,
    options: ConsumerGroupOptions,
    {
      ConsumerGroupClass,
      HighLevelProducerClass,
      KafkaClientClass
    }: {
      ConsumerGroupClass: Class | null,
      HighLevelProducerClass: Class | null,
      KafkaClientClass: Class | null
    } = {
      ConsumerGroupClass: null,
      HighLevelProducerClass: null,
      KafkaClientClass: null
    }) {
    if (!client) {
      client = KafkaClientClass ? new KafkaClientClass(options) : new KafkaClient(options)
    }
    if (!producer) {
      producer = HighLevelProducerClass ? new HighLevelProducerClass() : new HighLevelProducer(client)
    }
    this.consumerGroup = ConsumerGroupClass ? new ConsumerGroupClass : new ConsumerGroup(options, topic)
    this.producer = producer
    this.registerOnMessage(onMessage)
  }

  public send (payloads: ProduceRequest[]): Promise<object> {
    return new Promise((resolve, reject): void => {
      if (!producerReady) {
        this.producer.on('ready', (): void => {
          producerReady = true
          this.producer.send(payloads, (error, data): void => {
            if (error) {
              reject(error)
            } else {
              resolve(data)
            }
          })
        })
      } else {
        this.producer.send(payloads, (error, data): void => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
      }
    })
  }

  protected registerOnMessage (onMessage: (message: string) => void): void {
    this.consumerGroup.on('message', async (message): Promise<void> => {
      await onMessage(message)
    })
  }
}
