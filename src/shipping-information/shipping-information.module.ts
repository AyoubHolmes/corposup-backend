import { Module } from '@nestjs/common';
import { ShippingInformationService } from './shipping-information.service';
import { ShippingInformationController } from './shipping-information.controller';

@Module({
  controllers: [ShippingInformationController],
  providers: [ShippingInformationService]
})
export class ShippingInformationModule {}
