import { Injectable } from '@nestjs/common';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Whitelist } from './entities/whitelist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(Whitelist)
    private whiteListRepository: Repository<Whitelist>,
  ) {}
  async create(createWhitelistDto: CreateWhitelistDto) {
    return await this.whiteListRepository.save({
      email: createWhitelistDto.email,
    });
  }

  async findAll() {
    return await this.whiteListRepository.find();
  }
}
