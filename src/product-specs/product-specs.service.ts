import { Injectable } from '@nestjs/common';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';

@Injectable()
export class ProductSpecsService {
  create(createProductSpecDto: CreateProductSpecDto) {
    return 'This action adds a new productSpec';
  }

  findAll() {
    return `This action returns all productSpecs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSpec`;
  }

  update(id: number, updateProductSpecDto: UpdateProductSpecDto) {
    return `This action updates a #${id} productSpec`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSpec`;
  }
}
