import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSpecsService } from './product-specs.service';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';

@Controller('product-specs')
export class ProductSpecsController {
  constructor(private readonly productSpecsService: ProductSpecsService) {}

  @Post()
  create(@Body() createProductSpecDto: CreateProductSpecDto) {
    return this.productSpecsService.create(createProductSpecDto);
  }

  @Get()
  findAll() {
    return this.productSpecsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSpecsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSpecDto: UpdateProductSpecDto) {
    return this.productSpecsService.update(+id, updateProductSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSpecsService.remove(+id);
  }
}
