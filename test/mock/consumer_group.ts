import { IConsumerGroup } from '../../src/kafka/interfaces/consumer_group'

export class ConsumerGroup implements IConsumerGroup {
  public on (name: string, callback: (message: string) => void): void {
    callback('success')
  }
}
