import { Article } from 'src/article/entity/article.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateArticleRevisionDto } from '../dto/create.article.revision.dto';
import { ArticleRevision } from '../entity/article.revision.entity';

@EntityRepository(ArticleRevision)
export class ArticleRevisionRepository extends Repository<ArticleRevision> {
  async createRevision(data: CreateArticleRevisionDto, article: Article) {
    const revision = new ArticleRevision();
    revision.article = article;
    revision.tags = data.tags || [];
    revision.title = data.title || null;

    return await revision.save();
  }
}
