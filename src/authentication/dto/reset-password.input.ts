import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class resetPassword {
  @Field()
  @IsString()
  hash: string;

  @Field()
  @IsString()
  @MaxLength(100)
  @MinLength(8)
  password: string;
}
