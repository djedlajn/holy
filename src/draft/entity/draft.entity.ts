import { Article } from 'src/article/entity/article.entity';
import { Revision } from 'src/base/base.revision.entity';
import User from 'src/user/entity/user.entity';
import { CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class Draft extends Revision {
  @ManyToOne(
    type => Article,
    article => article.drafts,
  )
  article: Article;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  user: User;
}
