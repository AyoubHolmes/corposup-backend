import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpService } from 'src/gcp/gcp.service';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Store } from 'src/store/entities/store.entity';
import { StoreModule } from 'src/store/store.module';
import { StoreService } from 'src/store/store.service';
import { CityModule } from 'src/city/city.module';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';

@Module({
  imports: [
    GcpModule,
    TypeOrmModule.forFeature([Product, Category, Store, City]),
    UserModule,
    CategoryModule,
    StoreModule,
    CityModule,
  ],
  providers: [
    ProductService,
    GcpService,
    CategoryService,
    StoreService,
    CityService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
