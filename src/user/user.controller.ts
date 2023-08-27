import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { User } from './decorators/user.decorator';
import { UpdateUserCredentialsDto } from './dtos/user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import {
  DeleteAvatarDocs,
  GetHeaderDocs,
  GetProfileInfoDocs,
  UpdateCredentialsDocs,
} from './user.swagger';
import { Role } from './entities/user.entity';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @GetHeaderDocs()
  @Get('/header')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async headerInfo(@User() user: IUser) {
    return await this.userService.getHeaderInfo(user.id);
  }

  @GetProfileInfoDocs()
  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async profileInfo(@User() user: IUser) {
    return await this.userService.getProfileInfo(user.id);
  }

  @DeleteAvatarDocs()
  @Delete('/resetAvatar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async resetAvatar(@User() user: IUser) {
    return await this.userService.resetAvatar(user.id);
  }

  @UpdateCredentialsDocs()
  @Patch('/updateCredentials')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCredentials(
    @User() user: IUser,
    @Body() updateCredentials: UpdateUserCredentialsDto,
  ) {
    return await this.userService.updateCredentials(user.id, updateCredentials);
  }

  @Get('/savedProducts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getSavedProducts(@User() user: IUser) {
    return await this.userService.getSavedProducts(user);
  }

  @Get('/registeredProducts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  async getRegisteredProducts(@User() user: IUser) {
    return await this.userService.getRegisteredProducts(user);
  }

  @Put('/savedProducts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async saveProduct(
    @Param('productId') productId: string,
    @User() user: IUser,
  ) {
    return await this.userService.saveProduct(productId, user.id);
  }

  @Delete('/savedProducts/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteSavedProduct(
    @Param('productId') productId: string,
    @User() user: IUser,
  ) {
    return await this.userService.deleteSavedProduct(productId, user.id);
  }

  /* ***** ADMIN ENDPOINTS ******** */

  @GetHeaderDocs()
  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async getUser(@Param('id') id) {
    return await this.userService.getHeaderInfo(id);
  }
}
