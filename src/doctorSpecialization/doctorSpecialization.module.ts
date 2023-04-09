import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DoctorSpecializationResolvers } from './doctorSpecialization.resolvers';
import { DoctorSpecializationService } from './doctorSpecialization.service';

@Module({
  providers: [
    DoctorSpecializationResolvers,
    DoctorSpecializationService,
    PrismaService,
  ],
})
export class DoctorSpecializationModule {}
