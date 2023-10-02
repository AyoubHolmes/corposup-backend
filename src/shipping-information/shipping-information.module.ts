import { Module } from '@nestjs/common';
import { ShippingInformationService } from './shipping-information.service';
import { ShippingInformationController } from './shipping-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingInformation } from './entities/shipping-information.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Product } from 'src/product/entities/product.entity';
import { StoreService } from 'src/store/store.service';
import { GcpService } from 'src/gcp/gcp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingInformation, Store, User, Product]),
  ],
  controllers: [ShippingInformationController],
  providers: [
    ShippingInformationService,
    UserService,
    StoreService,
    GcpService,
  ],
})
export class ShippingInformationModule {}
