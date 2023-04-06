import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { randomBytes } from 'crypto';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOne(findObj: Prisma.UserFindFirstArgs): Promise<User> {
    return this.prisma.user.findFirst(findObj);
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const { email, password: plainPassword, firstName, lastName, role } = input;

    const password = await bcrypt.hash(plainPassword, 10);

    const userCheck = await this.findOne({
      where: { email },
    });

    if (userCheck) {
      throw new Error('User Exist with provided email');
    }

    const hash = await bcrypt.hash(randomBytes(16), 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        role,
        hash,
        hashExpiredAt: moment().add(24, 'hours').toDate(),
      },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findUserByHash(hash: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        hash,
        hashExpiredAt: {
          gte: new Date(),
        },
      },
    });
  }

  async updateUser(
    userUpdateInput: Prisma.UserUpdateArgs,
  ): Promise<User | null> {
    return this.prisma.user.update({
      data: userUpdateInput.data,
      where: userUpdateInput.where,
    });
  }
  // async delete(id: string): Promise<Post> {
  //   return this.prisma.post.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
