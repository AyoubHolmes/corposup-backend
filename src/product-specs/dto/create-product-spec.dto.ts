import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';

export class CreateProductSpecDto {
  @IsString()
  key: string;
  @IsString()
  value: string;
  @IsString()
  productId: string;
  @IsNotEmpty()
  product: Product;
}
