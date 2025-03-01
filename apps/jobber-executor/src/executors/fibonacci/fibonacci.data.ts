import { IsNotEmpty, IsPositive } from 'class-validator';

export class FibonacciData {
  @IsPositive()
  @IsNotEmpty()
  iteration: number;
}
