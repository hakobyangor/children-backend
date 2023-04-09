import { InputType, IntersectionType } from '@nestjs/graphql';
import { CreateDoctorInput } from './createDoctor.input';
import { StatusDTO } from 'src/utils/dto/status.dto';

@InputType()
export class UpdateDoctorInput extends IntersectionType(
  CreateDoctorInput,
  StatusDTO,
) {}
