import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRevisionRepository } from 'src/article-revision/repository/article.revision.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './repository/article.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository, ArticleRevisionRepository]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
