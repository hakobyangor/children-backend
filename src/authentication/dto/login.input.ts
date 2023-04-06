import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { UserRole, UserStatus } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Email Can not be empty' })
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  // status: UserStatus;
}
