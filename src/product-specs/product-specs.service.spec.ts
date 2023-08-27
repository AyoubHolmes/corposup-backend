import { Test, TestingModule } from '@nestjs/testing';
import { ProductSpecsService } from './product-specs.service';

describe('ProductSpecsService', () => {
  let service: ProductSpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSpecsService],
    }).compile();

    service = module.get<ProductSpecsService>(ProductSpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
