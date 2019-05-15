export interface IHighLevelProducer {
  on (name: string, callback: () => void): void;
  send (payload: unknown, callback: (error: Error | null, data: object | PromiseLike<object> | undefined) => void): void;
}
