import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    const request = context_.getContext();

    // should be the same name as args

    return request.req;
  }

  handleRequest(error, user, info, context) {
    if (!user || info || error) {
      const context_ = GqlExecutionContext.create(context);
      const reply = context_.getContext().reply;

      // reply.setCookie('token', '');
      // reply.setCookie('token-expires', '');

      throw error || new UnauthorizedException();
    }

    return user;
  }
}
