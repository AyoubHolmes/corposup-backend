import { Module } from '@nestjs/common';
import { ProductSpecsService } from './product-specs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSpec } from './entities/product-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpec])],
  providers: [ProductSpecsService],
})
export class ProductSpecsModule {}
