import { Injectable } from '@nestjs/common';
import { CreateShippingInformationDto } from './dto/create-shipping-information.dto';
import { UpdateShippingInformationDto } from './dto/update-shipping-information.dto';

@Injectable()
export class ShippingInformationService {
  create(createShippingInformationDto: CreateShippingInformationDto) {
    return 'This action adds a new shippingInformation';
  }

  findAll() {
    return `This action returns all shippingInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingInformation`;
  }

  update(id: number, updateShippingInformationDto: UpdateShippingInformationDto) {
    return `This action updates a #${id} shippingInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingInformation`;
  }
}
