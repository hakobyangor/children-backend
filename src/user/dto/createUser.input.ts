import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'FirstName Can not be empty' })
  @IsString()
  firstName!: string;

  @Field()
  @IsNotEmpty({ message: 'LastName Can not be empty' })
  @IsString()
  lastName!: string;

  @Field()
  @IsNotEmpty({ message: 'Email Can not be empty' })
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @Field()
  @IsNotEmpty()
  password?: string;

  @Field()
  @IsString()
  avatar?: string;

  // status: UserStatus;
}
