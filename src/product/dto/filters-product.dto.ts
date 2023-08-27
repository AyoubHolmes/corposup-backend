import { IsString } from 'class-validator';

export class ProductFilters {
  @IsString({ each: true })
  cities: string[];
  @IsString({ each: true })
  categories: string[];
}
