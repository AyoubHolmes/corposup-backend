import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpService } from 'src/gcp/gcp.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Store } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { ProductSpecsService } from 'src/product-specs/product-specs.service';
import { ProductSpec } from 'src/product-specs/entities/product-spec.entity';
import { ShippingInformationService } from 'src/shipping-information/shipping-information.service';
import { ShippingInformation } from 'src/shipping-information/entities/shipping-information.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    GcpModule,
    TypeOrmModule.forFeature([
      Product,
      Category,
      Store,
      City,
      ProductSpec,
      ShippingInformation,
    ]),
    UserModule,
  ],
  providers: [
    ProductService,
    GcpService,
    CategoryService,
    StoreService,
    CityService,
    ProductSpecsService,
    ShippingInformationService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
