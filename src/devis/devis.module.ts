import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevisService } from './devis.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [DevisController],
  providers: [DevisService],
})
export class DevisModule {}
