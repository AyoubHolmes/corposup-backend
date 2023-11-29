import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsOptional()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsOptional()
  description: string;
}

export class CreateMultipleDealsDto {
  @IsNotEmpty()
  deals: CreateDealDto[];
}
