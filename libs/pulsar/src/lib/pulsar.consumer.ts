import { Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';
import { PulsarService } from './pulsar.service';
import { deserialize } from './serialize';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  private consumer!: Consumer;
  protected logger = new Logger(this.topic);

  protected constructor(
    private readonly pulsarService: PulsarService,
    private readonly topic: string,
    private readonly subscription: string,
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarService.createConsumer(
      this.topic,
      this.subscription,
      (message) => {
        this.listener(message);
      },
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());

      await this.onMessage(data);
      this.logger.debug('Message acknowledged', data);
    } catch (error) {
      this.logger.error('Error processing message', error);
    } finally {
      this.logger.debug('Acknowledging message');
      await this.acknowledge(message);
    }
  }

  protected async acknowledge(message: Message) {
    await this.consumer.acknowledge(message);
  }

  protected negativeAcknowledge(message: Message) {
    this.consumer.negativeAcknowledge(message);
  }

  protected abstract onMessage(data: T): Promise<void>;
}
