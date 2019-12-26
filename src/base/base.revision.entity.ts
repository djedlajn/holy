import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Revision extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  tags: string[];
}
