import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DoctorService } from './doctor.service';
import { UseGuards } from '@nestjs/common';
import { Doctor } from '@prisma/client';
import { JWTAuthAdminGuard } from 'src/guards/auth-guards/jwtAuthAdmin.guard';
import { CreateDoctorInput } from './dto/createDoctor.input';
import { UpdateDoctorInput } from './dto/updateDoctor.input';

@Resolver('Doctor')
export class DoctorResolvers {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(JWTAuthAdminGuard)
  @Query(() => Promise<Doctor[]>)
  async doctors(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @UseGuards(JWTAuthAdminGuard)
  @Query(() => Promise<Doctor>)
  async doctorById(@Args('id') id: string) {
    return this.doctorService.getDoctorById(Number(id));
  }

  @Mutation(() => Promise<Doctor>)
  @UseGuards(JWTAuthAdminGuard)
  async createDoctor(
    @Args('createDoctorInput') createDoctorData: CreateDoctorInput,
  ): Promise<Doctor> {
    return this.doctorService.createDoctor(createDoctorData);
  }

  @Mutation(() => Promise<Doctor>)
  @UseGuards(JWTAuthAdminGuard)
  async updateDoctor(
    @Args('updateDoctorInput') updateDoctorData: UpdateDoctorInput,
    @Args('id') id: string,
  ): Promise<Doctor> {
    return this.doctorService.updateDoctor(Number(id), updateDoctorData);
  }
}
