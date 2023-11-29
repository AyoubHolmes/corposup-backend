import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto, CreateMultipleDealsDto } from './dto/create-deal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from 'src/user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDealDto: CreateDealDto, @User() user: IUser) {
    return this.dealsService.create(createDealDto, user.id);
  }

  @Post('multiple')
  @UseGuards(JwtAuthGuard)
  createMultiple(
    @Body() createMultipeDealDto: CreateMultipleDealsDto,
    @User() user: IUser,
  ) {
    return this.dealsService.createMultiple(createMultipeDealDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.dealsService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findAllMyDeals(@User() user: IUser) {
    return this.dealsService.findAllMyDeals(user);
  }

  @Get('vendor/me')
  @UseGuards(JwtAuthGuard)
  findAllMyDealsAsVendor(@User() user: IUser) {
    return this.dealsService.findAllMyDealsAsVendor(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @User() user: IUser) {
    return this.dealsService.findOne(id, user.id);
  }
}
