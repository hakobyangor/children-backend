import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [UserResolvers, UserService, PrismaService],
})
export class UserModule {}
