import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: 'email', passwordField: 'password' }); // email will be passed to validate function
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(
        'The entered e-mail or password are incorrect, please try again',
      );
    } else if (user && user.status === UserStatus.PENDING) {
      throw new UnauthorizedException('please verify your email to sign in');
    }
    return user;
  }
}
