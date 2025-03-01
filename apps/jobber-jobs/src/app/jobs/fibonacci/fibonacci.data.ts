import { IsPositive } from 'class-validator';

export class FibonacciData {
  @IsPositive()
  iteration: number;
}
