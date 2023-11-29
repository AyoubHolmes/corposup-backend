import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDealDto, CreateMultipleDealsDto } from './dto/create-deal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { IUser } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  async create(createDealDto: CreateDealDto, userId: string) {
    const user = await this.userService.findOneById(userId);
    const product = await this.productService.findOne(createDealDto.productId);
    if (user && product)
      return await this.dealRepository.save({
        product,
        user,
        description: createDealDto.description,
        quantity: createDealDto.quantity,
      });
    throw new BadRequestException();
  }

  async createMultiple(
    createMultipeDealDto: CreateMultipleDealsDto,
    userId: string,
  ) {
    const user = await this.userService.findOneById(userId);

    const creators = createMultipeDealDto.deals?.map(async (deal) => {
      const product = await this.productService.findOne(deal.productId);
      if (user && product)
        return await this.dealRepository.save({
          product,
          user,
          description: deal.description,
          quantity: deal.quantity,
        });
      throw new BadRequestException();
    });
    return creators && (await Promise.all(creators));
  }

  async findAll() {
    return await this.dealRepository.find();
  }

  async findAllMyDeals(user: IUser) {
    return await this.dealRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findAllMyDealsAsVendor(user: IUser) {
    const deals = await this.dealRepository.find({
      where: {
        product: {
          registeringUser: {
            id: user.id,
          },
        },
      },
      relations: ['user', 'product', 'product.registeringUser'],
    });
    const organizedDeals: { [userId: string]: Deal[] } = {};
    deals.forEach((deal) => {
      const userId = deal.user.id;
      if (!(userId in organizedDeals)) {
        organizedDeals[userId] = [];
      }
      organizedDeals[userId].push(deal);
    });
    const usersWithDeals: { user: User; deals: Deal[] }[] = Object.keys(
      organizedDeals,
    ).map((userId, id) => ({
      id,
      user: deals.find((deal) => deal.user.id === userId)?.user as User,
      deals: organizedDeals[userId],
    }));

    return usersWithDeals;
  }

  async findOne(id: string, userId: string) {
    return await this.dealRepository.find({
      where: { id, user: { id: userId } },
    });
  }
}
