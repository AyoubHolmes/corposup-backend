import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PERIOD_METRICS } from '../entities/shipping-information.entity';

export class CreateShippingInformationDto {
  @IsString()
  shippingMethod: string;
  @IsOptional()
  @IsBoolean()
  isFreeDelivery: boolean;
  @IsOptional()
  @IsBoolean()
  is48HoureFreeDelivery: boolean;
  @IsNumber()
  @IsOptional()
  shippingCost: number;
  @IsOptional()
  @IsNumber()
  estimatedDeliveryPeriod: number;
  @IsOptional()
  metric: PERIOD_METRICS;
  @IsString()
  carrier: string;
  @IsOptional()
  @IsUUID()
  userId: string;
}
