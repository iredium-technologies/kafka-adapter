import kafka = require('kafka-node')
import { IConsumerGroup } from './interfaces/consumer_group'

export class ConsumerGroup extends kafka.ConsumerGroup implements IConsumerGroup {

}
