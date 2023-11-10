import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Category } from './category/entities/category.entity';
import { Deal } from './deals/entities/deal.entity';
import { Product } from './product/entities/product.entity';
import { User } from './user/entities/user.entity';
import { City } from './city/entities/city.entity';
import { Store } from './store/entities/store.entity';
import { ProductSpec } from './product-specs/entities/product-spec.entity';
import { ShippingInformation } from './shipping-information/entities/shipping-information.entity';
import { Whitelist } from './whitelist/entities/whitelist.entity';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: +configService.get<string>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: <string>configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DB'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        Category,
        Deal,
        Product,
        User,
        City,
        Store,
        ProductSpec,
        ShippingInformation,
        Whitelist,
      ],
    };
    return config;
  },
};
