import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/authentication.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: false,
      context: ({ req }) => ({ ...req }),
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
      },
    }),
  ],
})
export class AppModule {}
