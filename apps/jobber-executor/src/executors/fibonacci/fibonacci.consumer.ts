import { Injectable } from '@nestjs/common';
import { PulsarConsumer, PulsarService } from '@jobber/pulsar';
import { iterate } from 'fibonacci';
import { FibonacciDataInterface } from './fibonacci-data.interface';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer<FibonacciDataInterface> {
  constructor(pulsarService: PulsarService) {
    super(
      pulsarService,
      'persistent://public/default/fibonacci',
      'fibonacci-consumer',
    );
  }

  async onMessage(data: FibonacciDataInterface): Promise<void> {
    const result = iterate(data.iteration);
    this.logger.log(result);
  }
}
