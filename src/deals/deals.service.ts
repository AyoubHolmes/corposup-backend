import { Inject, Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ProductService) private readonly productService: UserService,
  ) {}

  async create(createDealDto: CreateDealDto) {
    const user = await this.userService.findOneById(createDealDto.userId);
    const product = await this.productService.findOneById(
      createDealDto.productId,
    );
    if (user && product)
      return await this.dealRepository.save({
        product,
        user,
        description: createDealDto.description,
      });
  }

  findAll() {
    return `This action returns all deals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deal`;
  }
}
