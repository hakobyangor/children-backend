import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { randomBytes } from 'node:crypto';
import { resetPassword } from './dto/reset-password.input';
import { User, UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        // image: user.image
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpInput: RegisterInput) {
    const { email, password, firstName, lastName } = signUpInput;
    const userCheck = await this.userService.findOne({
      where: { email: email },
    });

    if (userCheck) {
      throw new Error('User Exist with provided email');
    }

    const user = await this.userService.createUser({
      email,
      password,
      firstName,
      lastName,
      role: UserRole.USER,
    });

    //const hash = await bcrypt.hash(randomBytes(16), 10);
    // const mail = {
    //   to: user.email,
    //   subject: 'Verify Email',
    //   from: process.env.SEND_GRID_MAIL_FROM_NO_REPLY,
    //   text: 'Verify Email',
    //   html: `<h1>verify Email</h1> for verify Email use this <a href="${process.env.FRONT_URL}verify-email?hash=${hash}"> link </a>`,
    // };

    // await this.sendgridService.send(mail);

    return user;
  }

  async resetPasswordEmail(userEmail: string) {
    const user = await this.userService.findOne({
      where: { email: userEmail },
    });

    if (user) {
      const hash = await bcrypt.hash(randomBytes(16), 10);
      // const mail = {
      //   to: user.email,
      //   subject: 'Reset Password',
      //   from: process.env.SEND_GRID_MAIL_FROM_NO_REPLY,
      //   text: 'Reset Password',
      //   html: `<h1>Reset Password</h1> for reset password use this <a href="${process.env.FRONT_URL}confirm-password?hash=${hash}"> link </a>`,
      // };

      // await this.sendgridService.send(mail);

      this.userService.updateUser({
        data: { hash, hashExpiredAt: moment().add(1, 'hour').toDate() },
        where: { email: user.email },
      });
      //todo send email
      return user;
    } else {
      throw new Error(
        'If the e-mail is registered in the system, we will send you an e-mail with the reset link ',
      );
    }
  }

  async resetPassword(resetPasswordData: resetPassword) {
    const { hash, password } = resetPasswordData;

    const user = await this.userService.findUserByHash(hash);

    if (!user) {
      throw new Error(
        'Reset Password Hash expired. Please try to reset again.',
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await this.userService.updateUser({
      data: { hash: null, hashExpiredAt: null, password: encryptedPassword },
      where: { id: user.id },
    });

    return user;
  }

  // async checkResetPasswordHash(hash: string) {
  //   const user = await this.userService.findByHash(hash);

  //   if (user) {
  //     return true;
  //   }

  //   return false;
  // }

  // async verifyEmail(hash: string) {
  //   const user = await this.userService.findByHash(hash);
  //   if (user) {
  //     return this.userService.update({
  //       where: { id: user.id },
  //       data: {
  //         status: Status.ACTIVE,
  //         hash: null,
  //         hashExpiredAt: null,
  //       },
  //     });
  //   } else {
  //     throw new Error('Invalid or expired hash');
  //   }
  // }
}
