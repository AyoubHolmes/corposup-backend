import { Module } from '@nestjs/common';
import { ShippingInformationService } from './shipping-information.service';
import { ShippingInformationController } from './shipping-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingInformation } from './entities/shipping-information.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingInformation, User, Product])],
  controllers: [ShippingInformationController],
  providers: [ShippingInformationService, UserService],
})
export class ShippingInformationModule {}
