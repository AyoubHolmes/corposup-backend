import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { typeOrmConfigAsync } from './typeorm.config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { DealsModule } from './deals/deals.module';
import { GcpModule } from './gcp/gcp.module';
import { CityModule } from './city/city.module';
import { StoreModule } from './store/store.module';
import { ShippingInformationModule } from './shipping-information/shipping-information.module';
import { WhitelistModule } from './whitelist/whitelist.module';
import { DevisModule } from './devis/devis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    UserModule,
    RedisModule,
    ProductModule,
    DealsModule,
    GcpModule,
    CategoryModule,
    CityModule,
    StoreModule,
    ShippingInformationModule,
    WhitelistModule,
    DevisModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
