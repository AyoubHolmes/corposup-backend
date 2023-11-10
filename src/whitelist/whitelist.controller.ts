import { Controller, Get, Post, Body } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Post()
  async create(@Body() createWhitelistDto: CreateWhitelistDto) {
    return await this.whitelistService.create(createWhitelistDto);
  }

  @Get()
  async findAll() {
    return await this.whitelistService.findAll();
  }
}
