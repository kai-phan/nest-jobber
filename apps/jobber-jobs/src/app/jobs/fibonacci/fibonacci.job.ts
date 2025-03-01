import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/job.decorator';
import { PulsarService } from '@jobber/pulsar';
import { FibonacciData } from './fibonacci.data';

@Job({
  name: 'fibonacci',
  description:
    'Calculates the Fibonacci sequence up to a given number and save to DB',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  messageClass = FibonacciData;

  constructor(pulsarService: PulsarService) {
    super(pulsarService);
  }
}
