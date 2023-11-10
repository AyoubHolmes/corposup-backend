import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShippingInformationDto } from './dto/create-shipping-information.dto';
import { UpdateShippingInformationDto } from './dto/update-shipping-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PERIOD_METRICS,
  ShippingInformation,
} from './entities/shipping-information.entity';
import { Repository } from 'typeorm';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class ShippingInformationService {
  constructor(
    @InjectRepository(ShippingInformation)
    private shippingInformationRepository: Repository<ShippingInformation>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(StoreService) private readonly storeService: StoreService,
  ) {}
  async create(
    createShippingInformationDto: CreateShippingInformationDto,
  ): Promise<ShippingInformation> {
    const registeringUser = await this.userService.findOneById(
      createShippingInformationDto.userId,
    );
    const store = await this.storeService.findOne(
      createShippingInformationDto.storeId,
    );
    if (
      createShippingInformationDto.is48HoureFreeDelivery ||
      createShippingInformationDto.isFreeDelivery
    ) {
      createShippingInformationDto.shippingCost = 0;
      if (createShippingInformationDto.is48HoureFreeDelivery) {
        createShippingInformationDto.metric = PERIOD_METRICS.DAYS;
        createShippingInformationDto.estimatedDeliveryPeriod = 2;
      }
    }
    if (registeringUser && store)
      return await this.shippingInformationRepository.save({
        ...createShippingInformationDto,
        store,
        registeringUser,
      });
    throw new BadRequestException();
  }

  async findMyShippingServices(user: IUser, id?: string) {
    if (id)
      return await this.shippingInformationRepository.find({
        where: {
          store: {
            id,
          },
          registeringUser: {
            id: user.id,
          },
        },
        relations: ['store'],
      });
    return await this.shippingInformationRepository.find({
      where: {
        registeringUser: {
          id: user.id,
        },
      },
      relations: ['store'],
    });
  }

  async findOne(id: string): Promise<ShippingInformation> {
    return await this.shippingInformationRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateShippingInformationDto: UpdateShippingInformationDto,
  ) {
    const shippingMethod = await this.shippingInformationRepository.find({
      where: { id },
    });
    if (shippingMethod)
      return await this.shippingInformationRepository.save({
        ...shippingMethod,
        ...updateShippingInformationDto,
      });
    throw new NotFoundException();
  }

  async remove(id: string) {
    return await this.shippingInformationRepository.delete({
      id,
    });
  }
}
