import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { GcpService } from 'src/gcp/gcp.service';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @Inject(GcpService) private readonly gcpService: GcpService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
    avatar: Express.Multer.File,
    user: IUser,
  ) {
    try {
      if (avatar) {
        const avatarUrl = await this.gcpService.uploadFile(avatar);
        createStoreDto.avatar = avatarUrl;
      }
      const registeringUser = await this.userService.findOneById(user.id);
      if (registeringUser) {
        return await this.storeRepository.save({
          ...createStoreDto,
          user: registeringUser,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.storeRepository.find();
  }

  async findOne(id: string) {
    return await this.storeRepository
      .findOne({
        where: { id },
        relations: ['products', 'user'],
      })
      .then((res) => {
        if (res) {
          const user = res.user;
          delete user.password;
          delete user.salt;
          res.user = { ...user };
        }
        return res;
      });
  }
}
