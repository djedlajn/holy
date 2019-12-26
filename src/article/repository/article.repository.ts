import { NotFoundException } from '@nestjs/common';
import { CreateArticleRevisionDto } from 'src/article-revision/dto/create.article.revision.dto';
import { ArticleRevisionRepository } from 'src/article-revision/repository/article.revision.repository';
import User from 'src/user/entity/user.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create.article.dto';
import { PublishArticleDto } from '../dto/publish.article.dto';
import { UpdateArticleDto } from '../dto/update.article.dto';
import { Article } from '../entity/article.entity';
import { ArticleQuerry } from '../dto/query.article.dto';
import { ArticleStatus } from '../enum/article.status.enum';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  private readonly articleRevisionRepository: ArticleRevisionRepository;
  constructor() {
    super();
    this.articleRevisionRepository = getCustomRepository(
      ArticleRevisionRepository,
    );
  }
  async createNewArticle(
    data: CreateArticleDto & CreateArticleRevisionDto,
    user: User,
  ) {
    const newArticle = new Article();
    newArticle.user = user;
    newArticle.published = data.published;
    newArticle.revisionsCount = 0;

    const article = await newArticle.save();

    const rev = await this.articleRevisionRepository.createRevision(
      data,
      article,
    );

    article.revisionsCount = article.revisionsCount + 1;
    article.currentRevision = rev.id;
    article.revisionData = rev.id;

    await article.save();

    delete article.user;
    return article;
  }

  private async findArticleById(id: string, userId: string) {
    const queryBuilder = this.createQueryBuilder('article');
    const article = await queryBuilder
      .where('article.id = :id AND article.user = :user', {
        id,
        user: userId,
      })
      .getOne();

    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  private async findRevisionById(id: string, articleId: string) {
    const rev = await this.articleRevisionRepository.findOne({
      where: {
        id,
        article: articleId,
      },
    });
    if (!rev) {
      throw new NotFoundException();
    }
    return rev;
  }

  async publishArticle(data: PublishArticleDto, id: string, user: User) {
    const article = await this.findArticleById(id, user.id);

    article.published = data.published;

    return await article.save();
  }

  async updateArticle(data: UpdateArticleDto, id: string, user: User) {
    const article = await this.findArticleById(id, user.id);
    const currRev = await this.articleRevisionRepository.findOne({
      id: article.currentRevision,
    });

    if (!currRev) {
      throw new NotFoundException();
    }

    const newRev = this.articleRevisionRepository.create();

    newRev.tags = data.tags || currRev.tags;
    newRev.title = data.title || currRev.title;
    newRev.article = article;

    const newRevision = await newRev.save();

    article.currentRevision = newRevision.id;
    article.revisionsCount = article.revisionsCount + 1;
    article.revisionData = newRevision.id;

    return await article.save();
  }

  async setRevision(id: string, revId: string, user: User) {
    const article = await this.findArticleById(id, user.id);

    const rev = await this.findRevisionById(revId, article.id);

    article.currentRevision = rev.id;
    return await article.save();
  }

  async getArticleById(id: string, user: User) {
    return await this.findArticleById(id, user.id);
  }

  async getAllArticles(data: ArticleQuerry) {
    if (data.status === ArticleStatus.UNPUBLISHED) {
      return await this.findAndCount({
        relations: ['revisionData'],
        where: { published: false },
      });
    }
    if (data.status === ArticleStatus.PUBLISHED) {
      return await this.findAndCount({
        relations: ['revisionData'],
        where: { published: true },
      });
    }
    return await this.findAndCount({
      relations: ['revisionData'],
    });
  }
}
