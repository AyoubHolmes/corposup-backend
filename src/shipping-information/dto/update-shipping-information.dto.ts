import { PartialType } from '@nestjs/swagger';
import { CreateShippingInformationDto } from './create-shipping-information.dto';

export class UpdateShippingInformationDto extends PartialType(
  CreateShippingInformationDto,
) {}
