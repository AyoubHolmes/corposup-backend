import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { PERIOD_METRICS } from 'src/shipping-information/entities/shipping-information.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(20)
  description: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  storeId: string;

  @IsOptional()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  city: string;

  @IsString({ each: true, message: 'TEST 1' })
  keys: string[];

  @IsString({ each: true, message: 'TEST 2' })
  values: string[];

  @IsOptional()
  shippingInfosId?: string;

  @IsOptional()
  @IsString()
  shippingMethod: string;

  @IsOptional()
  @IsNotEmpty()
  shippingCost: number;

  @IsOptional()
  @IsNotEmpty()
  estimatedDeliveryPeriod: number;

  @IsOptional()
  @IsNotEmpty()
  metric: PERIOD_METRICS;

  @IsOptional()
  @IsString()
  carrier: string;
}
