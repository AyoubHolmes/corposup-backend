import { Test, TestingModule } from '@nestjs/testing';
import { ProductSpecsController } from './product-specs.controller';
import { ProductSpecsService } from './product-specs.service';

describe('ProductSpecsController', () => {
  let controller: ProductSpecsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSpecsController],
      providers: [ProductSpecsService],
    }).compile();

    controller = module.get<ProductSpecsController>(ProductSpecsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
