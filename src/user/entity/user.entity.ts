import * as argon2 from 'argon2';
import { IsEmail, IsOptional } from 'class-validator';
import { Article } from 'src/article/entity/article.entity';
import { Draft } from 'src/draft/entity/draft.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional()
  @Column('varchar', { nullable: true })
  firstName: string;

  @IsOptional()
  @Column('varchar', { nullable: true })
  lastName: string;

  @IsEmail()
  @Column('varchar', { unique: true })
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(
    type => Article,
    article => article.user,
    { eager: true },
  )
  articles: Article[];

  @OneToMany(
    type => Draft,
    draft => draft.user,
  )
  drafts: Draft[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password, {
      memoryCost: 64 * 1024,
      hashLength: 32,
      timeCost: 3,
      parallelism: 2,
      type: 2,
    });
  }

  async checkIfPasswordValid(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}
