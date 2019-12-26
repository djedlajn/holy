import { Module } from '@nestjs/common';
import { ArticleRevisionController } from './article-revision.controller';
import { ArticleRevisionService } from './article-revision.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRevisionRepository } from './repository/article.revision.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRevisionRepository])],
  controllers: [ArticleRevisionController],
  providers: [ArticleRevisionService],
})
export class ArticleRevisionModule {}
