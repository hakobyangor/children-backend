import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateDoctorInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  long: number;

  @Field()
  @IsInt()
  doctorSpecializationId: number;
}
