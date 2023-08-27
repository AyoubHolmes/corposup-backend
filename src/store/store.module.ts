import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpService } from 'src/gcp/gcp.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User]), GcpModule, UserModule],
  controllers: [StoreController],
  providers: [StoreService, GcpService, UserService],
})
export class StoreModule {}
