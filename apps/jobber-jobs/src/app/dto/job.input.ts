import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import JSON from 'graphql-type-json';

@InputType()
export class JobInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => JSON)
  @IsNotEmpty()
  data: object | object[];
}
