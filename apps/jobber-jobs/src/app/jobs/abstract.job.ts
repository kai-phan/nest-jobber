import { PulsarService } from '@jobber/pulsar';
import { Producer } from 'pulsar-client';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  abstract messageClass: new () => T;
  protected constructor(private readonly pulsarService: PulsarService) {}

  async execute(name: string, data: T): Promise<string> {
    if (!this.producer) {
      this.producer = await this.pulsarService.createProducer(name);
    }

    const messageId = await this.producer.send({
      data: Buffer.from(JSON.stringify(data)),
    });

    return messageId.toString();
  }

  async validate(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length > 0) {
      throw new BadRequestException('Invalid data');
    }
  }
}
