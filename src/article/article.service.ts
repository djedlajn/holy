import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleRevisionDto } from 'src/article-revision/dto/create.article.revision.dto';
import User from 'src/user/entity/user.entity';
import { CreateArticleDto } from './dto/create.article.dto';
import { PublishArticleDto } from './dto/publish.article.dto';
import { ArticleQuerry } from './dto/query.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';
import { Article } from './entity/article.entity';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: ArticleRepository,
  ) {}
  async createArticle(
    data: CreateArticleDto & CreateArticleRevisionDto,
    user: User,
  ) {
    return await this.articleRepository.createNewArticle(data, user);
  }

  async publishArticle(data: PublishArticleDto, id: string, user: User) {
    return await this.articleRepository.publishArticle(data, id, user);
  }

  async updateArticle(data: UpdateArticleDto, id: string, user: User) {
    return await this.articleRepository.updateArticle(data, id, user);
  }

  async setRevision(id: string, revId: string, user: User) {
    return await this.articleRepository.setRevision(id, revId, user);
  }

  async getArticleById(id: string, user: User) {
    return await this.articleRepository.getArticleById(id, user);
  }

  async getAllArticles(data: ArticleQuerry) {
    return await this.articleRepository.getAllArticles(data);
  }
}
