import { Field, InputType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDoctorSpecializationInput {
  @Field()
  @IsNotEmpty({ message: 'name Can not be empty' })
  @IsString()
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  status!: Status;
}
