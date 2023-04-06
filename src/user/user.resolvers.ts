import { Get, Post, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JWTAuthGuard } from 'src/guards/auth-guards/jwtAuth.guard';
import { JWTAuthAdminGuard } from 'src/guards/auth-guards/jwtAuthAdmin.guard';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTAuthGuard)
  @Query(() => Promise<User[]>)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @Query(() => Promise<User>)
  async userById(@Args('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Mutation(() => Promise<User>)
  async createUser(
    @Args('createUserInput') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }
}
