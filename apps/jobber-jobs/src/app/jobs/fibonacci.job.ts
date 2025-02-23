import { AbstractJob } from './abstract.job';
import { Job } from '../decorators/job.decorator';

@Job({
  name: 'fibonacci',
  description:
    'Calculates the Fibonacci sequence up to a given number and save to DB',
})
export class FibonacciJob extends AbstractJob {}
