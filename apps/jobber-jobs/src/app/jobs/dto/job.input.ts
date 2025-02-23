import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class JobInput {
  @Field()
  @IsNotEmpty()
  name: string;
}
