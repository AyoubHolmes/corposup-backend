import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsOptional()
  description: string;
}
