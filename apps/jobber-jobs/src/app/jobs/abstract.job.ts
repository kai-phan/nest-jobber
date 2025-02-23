export abstract class AbstractJob {
  async execute(): Promise<void> {
    throw new Error('Method not implemented');
  }
}
