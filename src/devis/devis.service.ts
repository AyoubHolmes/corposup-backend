import { Injectable } from '@nestjs/common';
import { CreateDeviDto } from './dto/create.dto';
import { UpdateDeviDto } from './dto/update.dto';

@Injectable()
export class DevisService {
  create(createDeviDto: CreateDeviDto) {
    return 'This action adds a new devi';
  }

  findAll() {
    return `This action returns all devis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} devi`;
  }

  update(id: number, updateDeviDto: UpdateDeviDto) {
    return `This action updates a #${id} devi`;
  }

  remove(id: number) {
    return `This action removes a #${id} devi`;
  }
}
