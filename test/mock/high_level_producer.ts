import { ProduceRequest } from 'kafka-node'
import { IHighLevelProducer } from '../../src/kafka/interfaces/high_level_producer'

export class HighLevelProducer implements IHighLevelProducer {
  public on (name: string, callback: (message: string) => void): void {
    callback('success')
  }

  public send (payload: ProduceRequest, callback: (error: Error | null, payload: object) => void): void {
    callback(null, payload)
  }
}
