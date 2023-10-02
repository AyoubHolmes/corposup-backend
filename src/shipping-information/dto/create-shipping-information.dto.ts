import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PERIOD_METRICS } from '../entities/shipping-information.entity';

export class CreateShippingInformationDto {
  @IsString()
  shippingMethod: string;
  @IsNotEmpty()
  shippingCost: number;
  @IsNotEmpty()
  estimatedDeliveryPeriod: number;
  @IsNotEmpty()
  metric: PERIOD_METRICS;
  @IsString()
  carrier: string;
  @IsOptional()
  @IsUUID()
  storeId: string;
  @IsOptional()
  @IsUUID()
  userId: string;
}
