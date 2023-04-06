import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class verifyEmail {
  @Field()
  @IsString()
  hash: string;
}
