import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDealDto: CreateDealDto) {
    return this.dealsService.create(createDealDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(+id);
  }
}
