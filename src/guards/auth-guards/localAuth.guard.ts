import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { isEmail, isEmpty } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    const request = context_.getContext();
    // should be the same name as args
    request.body = context_.getArgs().loginInput;

    if (isEmpty(request.body.email)) {
      throw new Error('E-mail is empty');
    }

    if (isEmpty(request.body.password)) {
      throw new Error('Password is empty');
    }

    if (!isEmail(request.body.email)) {
      throw new Error('E-mail format is incorrect');
    }

    return request;
  }

  handleRequest(error, user, info) {
    if (error || !user || info) {
      throw (
        error ||
        new UnauthorizedException(
          'The entered e-mail or password are incorrect, please try again',
        )
      );
    }

    return user;
  }
}
