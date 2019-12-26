import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get.user.decorator';
import User from 'src/user/entity/user.entity';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create.draft.dto';
import { UpdateDraftDto } from './dto/update.draft.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Draft')
@ApiBearerAuth()
@Controller('draft')
@UseGuards(AuthGuard('jwt'))
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post('article/:id/create')
  createDraft(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: CreateDraftDto,
    @GetUser() user: User,
  ) {
    return this.draftService.createDraft(data, id, user);
  }
  @Patch(':id/update')
  updateDraft(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateDraftDto,
    @GetUser() user: User,
  ) {
    return this.draftService.updateDraft(data, id, user);
  }

  @Delete(':id')
  deleteDraft(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.draftService.deleteDrat(id, user);
  }

  @Post(':id/publish')
  publishDraft(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.draftService.publishDraft(id, user);
  }
}
