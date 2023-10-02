import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { User } from 'src/user/decorators/user.decorator';
import { Roles } from 'src/user/decorators/role.decorator';
import { Role } from 'src/user/entities/user.entity';
import { IUser } from 'src/user/interfaces/user.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { ProductFilters } from './dto/filters-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.VENDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('pictures'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: IUser,
    @UploadedFiles() pictures: Express.Multer.File[],
  ) {
    return await this.productService.create(createProductDto, user, pictures);
  }

  @Get('/label')
  async findByCategoryLabel(@Query('categoryLabel') categoryLabel?: string) {
    return await this.productService.findByCategoryLabel(categoryLabel);
  }

  @Get()
  async findByCategoryAndCity(
    @Query('categoryId') categoryId?: string,
    @Query('city') city?: string,
  ) {
    return await this.productService.findByCategoryAndCity(categoryId, city);
  }

  @Put()
  async findByCategoriesAndCities(@Body() body: ProductFilters) {
    return await this.productService.findByCategoriesAndCities(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  async findMyProducts(@User() user: IUser) {
    return await this.productService.findMyProducts(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: IUser,
  ) {
    return await this.productService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  async remove(@Param('id') id: string, @User() user: IUser) {
    return await this.productService.remove(id, user);
  }
}
