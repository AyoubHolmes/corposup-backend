import { Module } from '@nestjs/common';
import { ProductSpecsService } from './product-specs.service';
import { ProductSpecsController } from './product-specs.controller';

@Module({
  controllers: [ProductSpecsController],
  providers: [ProductSpecsService]
})
export class ProductSpecsModule {}
