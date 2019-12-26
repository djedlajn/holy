import { Article } from 'src/article/entity/article.entity';
import { Revision } from 'src/base/base.revision.entity';
import { CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class ArticleRevision extends Revision {
  @ManyToOne(
    type => Article,
    article => article.revisions,
    { eager: false },
  )
  article: Article;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
