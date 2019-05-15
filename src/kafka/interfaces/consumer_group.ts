export interface IConsumerGroup {
  on (name: string, callback: (message: string) => void): void;
}
