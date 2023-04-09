import { Field, InputType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class StatusDTO {
  @Field()
  @IsNotEmpty()
  status: Status;
}
