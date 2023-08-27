import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

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

  // @IsNumber()
  @IsOptional()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  city: string;
}
