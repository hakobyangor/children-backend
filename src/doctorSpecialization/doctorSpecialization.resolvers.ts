import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DoctorSpecialization } from '@prisma/client';
import { JWTAuthGuard } from 'src/guards/auth-guards/jwtAuth.guard';
import { JWTAuthAdminGuard } from 'src/guards/auth-guards/jwtAuthAdmin.guard';
import { DoctorSpecializationService } from './doctorSpecialization.service';
import { CreateDoctorSpecializationInput } from './dto/createDoctorSpecialization.input';
import { UpdateDoctorSpecializationInput } from './dto/updateDoctorSpecialization.input';

@Resolver('DoctorSpecialization')
export class DoctorSpecializationResolvers {
  constructor(
    private readonly doctorSpecializationService: DoctorSpecializationService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Query(() => Promise<DoctorSpecialization[]>)
  async doctorSpecializations(): Promise<DoctorSpecialization[]> {
    return this.doctorSpecializationService.findAll();
  }

  @UseGuards(JWTAuthAdminGuard)
  @Query(() => Promise<DoctorSpecialization>)
  async doctorSpecializationById(@Args('id') id: string) {
    return this.doctorSpecializationService.findById(Number(id));
  }

  @Mutation(() => Promise<DoctorSpecialization>)
  @UseGuards(JWTAuthAdminGuard)
  async createDoctorSpecialization(
    @Args('createDoctorSpecializationInput')
    createDoctorSpecializationData: CreateDoctorSpecializationInput,
  ): Promise<DoctorSpecialization> {
    return this.doctorSpecializationService.createDoctorSpecialization(
      createDoctorSpecializationData,
    );
  }

  @Mutation(() => Promise<DoctorSpecialization>)
  @UseGuards(JWTAuthAdminGuard)
  async updateDoctorSpecialization(
    @Args('updateDoctorSpecializationInput')
    updateDoctorSpecializationData: UpdateDoctorSpecializationInput,
    @Args('id') id: string,
  ): Promise<DoctorSpecialization> {
    return this.doctorSpecializationService.updateDoctorSpecialization(
      Number(id),
      updateDoctorSpecializationData,
    );
  }

  @Mutation(() => Promise<DoctorSpecialization>)
  @UseGuards(JWTAuthAdminGuard)
  async deleteDoctorSpecialization(
    @Args('id') id: string,
  ): Promise<DoctorSpecialization> {
    return this.doctorSpecializationService.deleteDoctorSpecialization(
      Number(id),
    );
  }
}
