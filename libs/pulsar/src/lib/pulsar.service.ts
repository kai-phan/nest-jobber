import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Client, Consumer, Message, Producer } from 'pulsar-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PulsarService implements OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}

  private client: Client = new Client({
    serviceUrl: this.configService.getOrThrow('PULSAR_SERVICE_URL'),
  });

  private producers: Producer[] = [];
  private consumers: Consumer[] = [];

  async onModuleDestroy() {
    await Promise.all([
      this.producers.map((p) => p.close()),
      this.consumers.map((c) => c.close()),
    ]);

    return this.client.close();
  }

  async createProducer(topic: string) {
    const producer = await this.client.createProducer({
      topic,
    });

    this.producers.push(producer);

    return producer;
  }

  async createConsumer(
    topic: string,
    subscription: string,
    listener?: (message: Message) => void,
  ) {
    const consumer = await this.client.subscribe({
      topic,
      subscription,
      listener,
    });

    this.consumers.push(consumer);

    return consumer;
  }
}
