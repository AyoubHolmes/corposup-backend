import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInformationController } from './shipping-information.controller';
import { ShippingInformationService } from './shipping-information.service';

describe('ShippingInformationController', () => {
  let controller: ShippingInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingInformationController],
      providers: [ShippingInformationService],
    }).compile();

    controller = module.get<ShippingInformationController>(ShippingInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
