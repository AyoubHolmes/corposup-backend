import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ProductFilters {
  @IsString({ each: true })
  cities: string[];
  @IsString({ each: true })
  categories: string[];
  @IsBoolean()
  @IsOptional()
  is48HoureFreeDelivery: boolean;
  @IsBoolean()
  @IsOptional()
  isFreeDelivery: boolean;
}
