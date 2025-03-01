import { PulsarService, serialize } from '@jobber/pulsar';
import { Producer } from 'pulsar-client';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  abstract messageClass: new () => T;
  protected constructor(private readonly pulsarService: PulsarService) {}

  async execute(name: string, data: T | T[]): Promise<void> {
    if (!this.producer) {
      this.producer = await this.pulsarService.createProducer(name);
    }

    if (Array.isArray(data)) {
      for (const item of data) {
        await this.send(item);
      }
      return;
    }

    await this.send(data);
  }

  async send(data: T): Promise<void> {
    await this.validate(data);
    await this.producer.send({
      data: serialize(data),
    });
  }

  async validate(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length > 0) {
      throw new BadRequestException('Invalid data', { cause: errors });
    }
  }
}
