import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
  ) {}

  create(createDealDto: CreateDealDto) {
    return 'This action adds a new deal';
  }

  findAll() {
    return `This action returns all deals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deal`;
  }
}
