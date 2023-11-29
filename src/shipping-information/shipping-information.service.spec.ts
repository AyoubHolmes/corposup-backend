import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInformationService } from './shipping-information.service';
import { UserService } from 'src/user/user.service';
import { StoreService } from 'src/store/store.service';
import { CreateShippingInformationDto } from './dto/create-shipping-information.dto';
import {
  PERIOD_METRICS,
  ShippingInformation,
} from './entities/shipping-information.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ShippingInformationService', () => {
  let service: ShippingInformationService;
  let userRepository: Repository<ShippingInformation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingInformationService,
        UserService,
        StoreService,
        {
          provide: getRepositoryToken(ShippingInformation),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShippingInformationService>(
      ShippingInformationService,
    );
    userRepository = module.get<Repository<ShippingInformation>>(
      getRepositoryToken(ShippingInformation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new shipping information', async () => {
      jest
        .spyOn(service['userService'], 'findOneById')
        .mockResolvedValueOnce({ id: 'user-id' } as any);

      const createDto: CreateShippingInformationDto = {
        userId: 'user-id',
        shippingMethod: '',
        isFreeDelivery: false,
        is48HoureFreeDelivery: false,
        shippingCost: 0,
        estimatedDeliveryPeriod: 0,
        metric: PERIOD_METRICS.DAYS,
        carrier: '',
      };

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createDto),
      );
    });

    it('should handle invalid user ID during creation', async () => {
      jest
        .spyOn(service['userService'], 'findOneById')
        .mockResolvedValueOnce(undefined);

      const createDto: CreateShippingInformationDto = {
        userId: 'nonexistent-user-id',
        shippingMethod: '',
        isFreeDelivery: false,
        is48HoureFreeDelivery: false,
        shippingCost: 0,
        estimatedDeliveryPeriod: 0,
        metric: PERIOD_METRICS.DAYS,
        carrier: '',
      };

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
