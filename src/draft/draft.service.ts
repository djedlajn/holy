import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entity/user.entity';
import { CreateDraftDto } from './dto/create.draft.dto';
import { UpdateDraftDto } from './dto/update.draft.dto';
import { Draft } from './entity/draft.entity';
import { DraftRepository } from './repository/draft.repository';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft) private readonly draftRepository: DraftRepository,
  ) {}

  async createDraft(data: CreateDraftDto, id: string, user: User) {
    return await this.draftRepository.createDraft(data, id, user);
  }

  async updateDraft(data: UpdateDraftDto, id: string, user: User) {
    return await this.draftRepository.updateDraft(data, id, user);
  }

  async deleteDrat(id: string, user: User) {
    return await this.draftRepository.deleteDraft(id, user);
  }

  async publishDraft(id: string, user: User) {
    return await this.draftRepository.publishDraft(id, user);
  }
}
