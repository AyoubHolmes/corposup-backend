import { IsOptional, IsString } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  @IsOptional()
  description: string;
}
