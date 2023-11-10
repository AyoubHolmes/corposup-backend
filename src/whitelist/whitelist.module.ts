import { Module } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { WhitelistController } from './whitelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Whitelist } from './entities/whitelist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Whitelist])],
  controllers: [WhitelistController],
  providers: [WhitelistService],
})
export class WhitelistModule {}
