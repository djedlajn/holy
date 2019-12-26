import { ArticleRevision } from 'src/article-revision/entity/article.revision.entity';
import { Draft } from 'src/draft/entity/draft.entity';
import User from 'src/user/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  published: boolean;

  @ManyToOne(
    type => User,
    user => user.articles,
    { eager: false },
  )
  user: User;

  @OneToMany(
    type => ArticleRevision,
    article => article.article,
    { eager: true },
  )
  revisions: ArticleRevision[];

  @Column('uuid', { nullable: true })
  currentRevision: string;

  @OneToMany(
    type => Draft,
    draft => draft.article,
    { eager: true },
  )
  drafts: Draft[];

  @OneToOne(type => ArticleRevision, { eager: false })
  @JoinColumn()
  revisionData: string;

  @Column('integer', { nullable: true })
  revisionsCount: number;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
