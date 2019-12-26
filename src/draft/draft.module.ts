import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftService } from './draft.service';
import { DraftRepository } from './repository/draft.repository';
import { DraftController } from './draft.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DraftRepository])],
  providers: [DraftService],
  controllers: [DraftController],
})
export class DraftModule {}
