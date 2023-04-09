import { Injectable } from '@nestjs/common';
import { Doctor, Status } from '@prisma/client';
import { CreateDoctorInput } from 'src/generated/graphql';
import { PrismaService } from 'src/prisma.service';
import { UpdateDoctorInput } from './dto/updateDoctor.input';
import * as moment from 'moment';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      include: { doctorSpecialization: true },
    });
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return this.prisma.doctor.findFirst({
      where: {
        id,
      },
      include: {
        doctorSpecialization: true,
      },
    });
  }

  async createDoctor(input: CreateDoctorInput): Promise<Doctor> {
    const doctor = await this.prisma.doctor.create({
      include: {
        doctorSpecialization: true,
      },
      data: input,
    });

    return doctor;
  }

  async updateDoctor(id: number, input: UpdateDoctorInput): Promise<Doctor> {
    const doctor = await this.prisma.doctor.update({
      include: {
        doctorSpecialization: true,
      },
      data: input,
      where: {
        id,
      },
    });

    return doctor;
  }

  async deleteDoctor(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.update({
      include: {
        doctorSpecialization: true,
      },
      data: {
        status: Status.DELETED,
        deletedAt: moment().toDate(),
      },
      where: {
        id,
      },
    });

    return doctor;
  }
}
