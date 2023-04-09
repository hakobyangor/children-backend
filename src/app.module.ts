import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/authentication.module';
import { join } from 'path';
import { DoctorSpecializationModule } from './doctorSpecialization/doctorSpecialization.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    DoctorModule,
    DoctorSpecializationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: false,
      context: ({ req }) => ({ ...req }),
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
      },
      playground: process.env.NODE_ENV === 'prod' ? false : true,
    }),
  ],
})
export class AppModule {}
