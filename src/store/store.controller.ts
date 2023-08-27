import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Roles(Role.VENDOR)
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @User() user: IUser,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.storeService.create(createStoreDto, avatar, user);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }
}
