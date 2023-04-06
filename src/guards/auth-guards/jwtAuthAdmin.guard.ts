import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@Injectable()
export class JWTAuthAdminGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    const request = context_.getContext();

    return request;
  }

  handleRequest(error, user, info, context) {
    if (!user || info || error || user.role != UserRole.ADMIN) {
      const context_ = GqlExecutionContext.create(context);
      const reply = context_.getContext().reply;

      // reply.setCookie('token', '');
      // reply.setCookie('token-expires', '');

      throw error || new UnauthorizedException();
    }

    return user;
  }
}
