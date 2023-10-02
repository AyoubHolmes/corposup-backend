/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { GcpService } from 'src/gcp/gcp.service';
import { CategoryService } from 'src/category/category.service';
import { StoreService } from 'src/store/store.service';
import { ProductFilters } from './dto/filters-product.dto';
import { CityService } from 'src/city/city.service';
import { ShippingInformationService } from 'src/shipping-information/shipping-information.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(StoreService) private readonly storeService: StoreService,
    @Inject(GcpService) private readonly gcpService: GcpService,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CityService) private readonly cityService: CityService,
    @Inject(ShippingInformationService)
    private readonly ShippingInformationService: ShippingInformationService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: IUser,
    pictures: Express.Multer.File[],
  ) {
    const registeringUser = await this.userService.findOneById(user.id);
    const picturesUrls = await this.gcpService.uploadMultipleFiles(pictures);
    // const picturesUrls = [];
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    const city = await this.cityService.findOne(createProductDto.city);
    const store = await this.storeService.findOne(createProductDto.storeId);
    const shippingInformation = createProductDto.shippingInfosId
      ? await this.ShippingInformationService.findOne(
          createProductDto.shippingInfosId,
        )
      : {
          shippingMethod: createProductDto.shippingMethod,
          shippingCost: createProductDto.shippingCost,
          estimatedDeliveryPeriod: createProductDto.estimatedDeliveryPeriod,
          metric: createProductDto.metric,
          carrier: createProductDto.carrier,
          registeringUser: await this.userService.findOneById(user.id),
          store,
        };

    if (registeringUser && picturesUrls && category && store && city) {
      const specs = createProductDto.keys.map((key, index) => ({
        key,
        value: createProductDto.values[index],
      }));
      return await this.productRepository.save({
        ...createProductDto,
        category,
        city,
        pictures: picturesUrls,
        registeringUser,
        store,
        specs,
        shippingInformation,
      });
    }
    throw new BadRequestException();
  }

  async findByCategoryAndCity(categoryId?: string, cityId?: string) {
    const city = await this.cityService.findOne(cityId);
    const condition = !categoryId
      ? { city }
      : {
          city,
          category: {
            id: categoryId,
          },
        };
    return await this.productRepository.find({
      where: { ...condition },
      relations: [
        'store',
        'city',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
  }

  async findByCategoryLabel(label: string) {
    return await this.productRepository.find({
      where: [
        {
          category: {
            label,
          },
        },
        {
          category: {
            parent: {
              label,
            },
          },
        },
      ],
      relations: [
        'store',
        'city',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
  }

  async findByCategoriesAndCities(filters: ProductFilters) {
    return await this.productRepository.find({
      where: {
        category: filters.categories.map((category) => ({
          id: category,
        })),
        city: filters.cities.map((city) => ({
          id: city,
        })),
      },
      relations: [
        'store',
        'city',
        'category',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'store',
        'city',
        'category',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
    if (product) return product;
    throw new BadRequestException('Product not found');
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: IUser) {
    const product = await this.productRepository.findOne({
      where: {
        id,
        registeringUser: {
          id: user.id,
        },
      },
    });
    if (product) {
      let city = product.city;
      if (updateProductDto.city !== product.city.id) {
        city = await this.cityService.findOne(updateProductDto.city);
      }
      const newProduct = { ...product, ...updateProductDto, city };
      return await this.productRepository.save(newProduct);
    }
    throw new NotFoundException();
  }

  async remove(id: string, user: IUser) {
    const product = await this.productRepository.findOne({
      where: {
        id,
        registeringUser: {
          id: user.id,
        },
      },
      relations: [
        'store',
        'city',
        'category',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
    if (product)
      return await this.productRepository.delete({
        id,
      });
    throw new NotFoundException();
  }

  async findMyProducts(user: IUser) {
    return await this.productRepository.find({
      where: {
        registeringUser: {
          id: user.id,
        },
      },
      relations: [
        'category',
        'deals',
        'store',
        'specs',
        'shippingInformation',
        'category',
        'category.parent',
      ],
    });
  }
}
