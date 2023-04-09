import { Injectable } from '@nestjs/common';
import { DoctorSpecialization, Status } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { CreateDoctorSpecializationInput } from './dto/createDoctorSpecialization.input';
import { UpdateDoctorSpecializationInput } from './dto/updateDoctorSpecialization.input';
import * as moment from 'moment';

@Injectable()
export class DoctorSpecializationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<DoctorSpecialization[]> {
    return this.prisma.doctorSpecialization.findMany({});
  }

  async findById(id: number): Promise<DoctorSpecialization> {
    return this.prisma.doctorSpecialization.findUnique({ where: { id } });
  }

  async createDoctorSpecialization(
    input: CreateDoctorSpecializationInput,
  ): Promise<DoctorSpecialization> {
    const doctorSpecialization = await this.prisma.doctorSpecialization.create({
      data: input,
    });

    return doctorSpecialization;
  }

  async updateDoctorSpecialization(
    id: number,
    input: UpdateDoctorSpecializationInput,
  ): Promise<DoctorSpecialization> {
    const doctorSpecialization = await this.prisma.doctorSpecialization.update({
      data: input,
      where: {
        id,
      },
    });

    return doctorSpecialization;
  }

  async deleteDoctorSpecialization(id: number): Promise<DoctorSpecialization> {
    const doctorSpecialization = await this.prisma.doctorSpecialization.update({
      data: {
        status: Status.DELETED,
        deletedAt: moment().toDate(),
      },
      where: {
        id,
      },
    });

    return doctorSpecialization;
  }
}
