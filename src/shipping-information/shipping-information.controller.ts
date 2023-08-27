import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingInformationService } from './shipping-information.service';
import { CreateShippingInformationDto } from './dto/create-shipping-information.dto';
import { UpdateShippingInformationDto } from './dto/update-shipping-information.dto';

@Controller('shipping-information')
export class ShippingInformationController {
  constructor(private readonly shippingInformationService: ShippingInformationService) {}

  @Post()
  create(@Body() createShippingInformationDto: CreateShippingInformationDto) {
    return this.shippingInformationService.create(createShippingInformationDto);
  }

  @Get()
  findAll() {
    return this.shippingInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingInformationDto: UpdateShippingInformationDto) {
    return this.shippingInformationService.update(+id, updateShippingInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingInformationService.remove(+id);
  }
}
