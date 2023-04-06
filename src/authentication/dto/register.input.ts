import { InputType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/createUser.input';

@InputType()
export class RegisterInput extends PickType(CreateUserInput, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {}
