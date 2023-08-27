import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
