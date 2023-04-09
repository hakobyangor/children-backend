import { Module } from '@nestjs/common';
import { DoctorResolvers } from './doctor.resolver';
import { DoctorService } from './doctor.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [DoctorResolvers, DoctorService, PrismaService],
})
export class DoctorModule {}
