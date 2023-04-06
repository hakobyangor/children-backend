import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: GqlExecutionContext) => {
    const context_ = GqlExecutionContext.create(context);

    return context_.getContext().user;
  },
);
