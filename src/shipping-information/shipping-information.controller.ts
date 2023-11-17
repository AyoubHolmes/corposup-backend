import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShippingInformationService } from './shipping-information.service';
import { CreateShippingInformationDto } from './dto/create-shipping-information.dto';
import { UpdateShippingInformationDto } from './dto/update-shipping-information.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { User } from 'src/user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('shipping-information')
export class ShippingInformationController {
  constructor(
    private readonly shippingInformationService: ShippingInformationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  create(
    @Body() createShippingInformationDto: CreateShippingInformationDto,
    @User() user: IUser,
  ) {
    return this.shippingInformationService.create({
      ...createShippingInformationDto,
      userId: user.id,
    });
  }

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  async findMyShippingServices(@User() user: IUser) {
    return await this.shippingInformationService.findMyShippingServices(user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  update(
    @Param('id') id: string,
    @Body() updateShippingInformationDto: UpdateShippingInformationDto,
  ) {
    return this.shippingInformationService.update(
      id,
      updateShippingInformationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  remove(@Param('id') id: string) {
    return this.shippingInformationService.remove(id);
  }
}
