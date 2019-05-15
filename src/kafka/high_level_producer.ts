import kafka = require('kafka-node')
import { IHighLevelProducer } from './interfaces/high_level_producer'

export class HighLevelProducer extends kafka.HighLevelProducer implements IHighLevelProducer {

}
