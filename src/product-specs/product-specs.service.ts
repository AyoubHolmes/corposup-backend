import { Injectable } from '@nestjs/common';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSpec } from './entities/product-spec.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSpecsService {
  constructor(
    @InjectRepository(ProductSpec)
    private productSpecsRepository: Repository<ProductSpec>, // @Inject(ProductService) private readonly productService: ProductService,
  ) {}
  async create(createProductSpecDto: CreateProductSpecDto) {
    if (createProductSpecDto.product)
      return await this.productSpecsRepository.save({
        ...createProductSpecDto,
        product: createProductSpecDto.product,
      });
  }
}
