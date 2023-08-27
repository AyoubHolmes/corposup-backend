import { BadRequestException, Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCity } from './dtos/city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(city: CreateCity) {
    const oldRecords = await this.cityRepository.find();
    const cityRecord = oldRecords?.find(
      (record) => record.label.toLowerCase() === city.label.toLowerCase(),
    );
    if (!cityRecord) return await this.cityRepository.save(city);
    throw new BadRequestException('Already exists');
  }

  async findAll() {
    return await this.cityRepository.find();
  }
  async findOne(id: string) {
    return await this.cityRepository.findOne({
      where: { id },
    });
  }
}
