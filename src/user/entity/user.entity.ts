import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

import { IsEmail, IsOptional } from 'class-validator';

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
  @Column('varchar')
  email: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
