import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInformationService } from './shipping-information.service';

describe('ShippingInformationService', () => {
  let service: ShippingInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingInformationService],
    }).compile();

    service = module.get<ShippingInformationService>(ShippingInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
