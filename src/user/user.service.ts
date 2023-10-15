import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { registerGoogleDto, signUpDto } from '../auth/auth.dto';
import {
  UpdateUserCredentialsDto,
  UpdateUserProfileDto,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { IUser } from './interfaces/user.interface';
// import { ProductService } from 'src/product/product.service';

@Injectable()
export class UserService {
  // private readonly productService: ProductService;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found!');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid password!');
    return user;
  }

  generateHash() {
    const secret = process.env.AUTH_KEY_SECRET || 'AUTH_KEY_SECRET';
    const random = Math.random();
    return crypto
      .createHash('sha256')
      .update(secret + random + new Date())
      .digest('hex');
  }

  async signUp(signupDto: signUpDto | registerGoogleDto): Promise<User> {
    try {
      const user: User = this.userRepository.create();
      user.firstname = signupDto.firstname;
      user.lastname = signupDto.lastname;
      user.email = signupDto.email;
      if ('password' in signupDto) {
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(signupDto.password, user.salt);
      } else if ('avatar' in signupDto) user.avatar = signupDto.avatar;
      user.role = signupDto.role;
      user.avatar = signupDto.avatar;
      await this.userRepository.save(user);
      delete user.password;
      delete user.salt;
      return user;
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('email'))
          throw new ConflictException(
            'This email address is already associated with an account',
          );
      } else throw err;
    }
  }

  // Getters
  async getApiKey(id: string) {
    const user: User = await this.userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.apiKey'])
      .where('users.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async getHeaderInfo(id: string) {
    const user: User = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.firstname',
        'users.lastname',
        'users.avatar',
        'users.role',
      ])
      .where('users.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('User not found!');

    return { ...user };
  }

  async getUser(id: string) {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found!');

    return { ...user };
  }

  async getProfileInfo(id: string) {
    // const user: User = await this.userRepository
    //   .createQueryBuilder('users')
    //   .select([
    //     'users.id',
    //     'users.avatar',
    //     'users.firstname',
    //     'users.lastname',
    //     'users.email',
    //     'users.contact',
    //     'users.role',
    //     'users.rc',
    //     'users.ice',
    //     'users.address',
    //     'users.city',
    //   ])
    //   .where('users.id = :id', { id })
    //   .getOne();

    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: ['city'],
    });

    if (!user) throw new NotFoundException('User not found!');

    delete user.password;
    delete user.salt;
    return user;
  }

  // Updaters
  async updateProfile(
    id: string,
    avatar: Express.Multer.File,
    updateUserInfo: UpdateUserProfileDto,
  ) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });
      user.firstname = updateUserInfo.firstname ?? user.firstname;
      user.lastname = updateUserInfo.lastname ?? user.lastname;
      user.email = updateUserInfo.email ?? user.email;

      await this.userRepository.save(user);
      return {
        firsname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        contact: user.contact,
        avatar: user.avatar,
      };
    } catch (err) {
      if (err.code === '23505') {
        if (err.detail.includes('email'))
          throw new ConflictException(
            'This email address is already associated with an account',
          );
      } else throw err;
    }
  }

  async resetAvatar(id: string) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });

      delete user.avatar;
      await this.userRepository.save(user);
      return user.avatar;
    } catch (err) {
      throw err;
    }
  }

  async updateCredentials(
    id: string,
    updateCredentials: UpdateUserCredentialsDto,
  ) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });

      if (updateCredentials.currPassword) {
        const passwordValid = await bcrypt.compare(
          updateCredentials.currPassword,
          user.password,
        );
        if (!passwordValid)
          throw new BadRequestException('Invalid current password');
      }
      if (
        updateCredentials.newPassword !== updateCredentials.confirmNewPassword
      )
        throw new BadRequestException(
          'New password does not match confirm password',
        );
      user.password = await bcrypt.hash(
        updateCredentials.newPassword,
        user.salt,
      );
      await this.userRepository.save(user);
      return 'Password updated Successfully';
    } catch (err) {
      throw err;
    }
  }

  async getSavedProducts(user: IUser) {
    try {
      const selectedUser: User = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['savedProducts'],
      });
      return selectedUser.savedProducts;
    } catch (err) {
      throw err;
    }
  }

  async getRegisteredProducts(user: IUser) {
    try {
      const selectedUser: User = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['product'],
      });
      return selectedUser.registeredProducts;
    } catch (err) {
      throw err;
    }
  }

  async saveProduct(productId: string, id: string) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });

      // const product = await this.productService.findOne(productId);

      // user.savedProducts.push(product);

      await this.userRepository.save(user);
      return;
    } catch (err) {
      throw err;
    }
  }

  async deleteSavedProduct(productId: string, id: string) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id },
      });

      // const product = await this.productService.findOne(productId);

      // user.savedProducts.push(product);

      await this.userRepository.save(user);
      return;
    } catch (err) {
      throw err;
    }
  }
}
