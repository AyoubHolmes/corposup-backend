import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDeviDto } from './dto/create.dto';
import { UpdateDeviDto } from './dto/update.dto';
import { DevisService } from './devis.service';

@Controller('devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @Post('order')
  async create(@Body() createDeviDto: CreateDeviDto) {
    return await this.devisService.create(createDeviDto);
  }

  @Get()
  findAll() {
    return this.devisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviDto: UpdateDeviDto) {
    return this.devisService.update(+id, updateDeviDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devisService.remove(+id);
  }
}
