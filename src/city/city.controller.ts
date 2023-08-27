import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { CreateCity } from './dtos/city.dto';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async create(@Body() city: CreateCity) {
    return await this.cityService.create(city);
  }

  @Get()
  async findAll() {
    return await this.cityService.findAll();
  }
}
