import { NotFoundException } from '@nestjs/common';
import { ArticleRepository } from 'src/article/repository/article.repository';
import User from 'src/user/entity/user.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { CreateDraftDto } from '../dto/create.draft.dto';
import { UpdateDraftDto } from '../dto/update.draft.dto';
import { Draft } from '../entity/draft.entity';

@EntityRepository(Draft)
export class DraftRepository extends Repository<Draft> {
  private readonly articleRepository: ArticleRepository;
  constructor() {
    super();

    this.articleRepository = getCustomRepository(ArticleRepository);
  }

  private async findDraftById(id: string, user: User) {
    const draft = await this.findOne({
      where: [{ id, user: user.id }],
      relations: ['article'],
    });
    if (!draft) {
      throw new NotFoundException();
    }
    return draft;
  }

  async createDraft(data: CreateDraftDto, id: string, user: User) {
    const article = await this.articleRepository.getArticleById(id, user);
    const draft = this.create();

    draft.tags = data.tags;
    draft.title = data.title;
    draft.article = article;
    draft.user = user;

    delete draft.user;

    return await draft.save();
  }

  async updateDraft(data: UpdateDraftDto, id: string, user: User) {
    const draft = await this.findDraftById(id, user);
    draft.title = data.title;
    draft.tags = data.tags;

    return await draft.save();
  }

  async deleteDraft(id: string, user: User) {
    const draft = await this.findDraftById(id, user);
    await draft.remove();
  }

  async publishDraft(id: string, user: User) {
    const draft = await this.findDraftById(id, user);
    const article = await this.articleRepository.updateArticle(
      { tags: draft.tags, title: draft.title },
      draft.article.id,
      user,
    );
    await draft.remove();

    return article;
  }
}
