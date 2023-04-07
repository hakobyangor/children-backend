import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        let errorMessage = '';

        // const errors = {};
        validationErrors.map((item) => {
          // todo check how to return error object
          // if (errors.hasOwnProperty(item.property)) {
          //   errors[item.property].push(item.constraints);
          // } else {
          //   errors[item.property] = [item.constraints];
          // }
          errorMessage += `${Object.values(item.constraints)}. `;
        });
        return new BadRequestException(errorMessage);
      },
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
