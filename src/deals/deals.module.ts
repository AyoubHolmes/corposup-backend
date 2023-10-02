import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ProductService } from 'src/product/product.service';
import { Store } from 'src/store/entities/store.entity';
import { StoreModule } from 'src/store/store.module';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpService } from 'src/gcp/gcp.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { City } from 'src/city/entities/city.entity';
import { CityModule } from 'src/city/city.module';
import { CityService } from 'src/city/city.service';
import { ShippingInformationService } from 'src/shipping-information/shipping-information.service';
import { ShippingInformation } from 'src/shipping-information/entities/shipping-information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Deal,
      User,
      Product,
      Store,
      Category,
      City,
      ShippingInformation,
    ]),
    UserModule,
    StoreModule,
    GcpModule,
    CityModule,
  ],
  controllers: [DealsController],
  providers: [
    DealsService,
    ProductService,
    GcpService,
    CategoryService,
    CityService,
    ShippingInformationService,
  ],
})
export class DealsModule {}
