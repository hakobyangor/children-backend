import { InputType, PickType } from '@nestjs/graphql';
import { CreateDoctorSpecializationInput } from './createDoctorSpecialization.input';

@InputType()
export class UpdateDoctorSpecializationInput extends PickType(
  CreateDoctorSpecializationInput,
  ['name', 'status'],
) {}
