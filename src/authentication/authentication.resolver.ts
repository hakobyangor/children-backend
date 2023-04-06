import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { UseGuards } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';

import { LocalAuthGuard } from 'src/guards/auth-guards/localAuth.guard';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation()
  async login(@Context() context) {
    const { user } = context;
    return this.authenticationService.login(user);
  }

  // @Mutation()
  // @UseGuards(CheckAuthGuard)
  // async logout(@CurrentUser() currentUser: User) {
  //   const user = await this.userService.findOne({
  //     where: { id: currentUser.id },
  //   });
  //   const reply = context.reply;
  //   reply.setCookie('token', '');
  //   reply.setCookie('token-expires', '');
  //   return user;
  // }

  @Mutation()
  signUp(@Args('signUpInput') signUpInput: RegisterInput) {
    return this.authenticationService.signUp(signUpInput);
  }

  // @Mutation()
  // verifyEmail(@Args('verifyEmail') verifyEmail: verifyEmail) {
  //   return this.authenticationService.verifyEmail(verifyEmail.hash);
  // }

  @Mutation()
  resetPasswordEmail(@Args('email') findUserArguments: string) {
    return this.authenticationService.resetPasswordEmail(findUserArguments);
  }

  // @Query(() => Boolean)
  // checkResetPasswordHash(
  //   @Args('checkResetPasswordHash') checkResetPasswordHash: verifyEmail,
  // ) {
  //   return this.authenticationService.checkResetPasswordHash(
  //     checkResetPasswordHash.hash,
  //   );
  // }

  @Mutation()
  resetPassword(@Args('resetPasswordInput') resetPasswordData) {
    return this.authenticationService.resetPassword(resetPasswordData);
  }
}
