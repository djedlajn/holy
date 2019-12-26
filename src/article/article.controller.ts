import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get.user.decorator';
import User from 'src/user/entity/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.article.dto';
import { PublishArticleDto } from './dto/publish.article.dto';
import { ArticleQuerry } from './dto/query.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';
import { Article } from './entity/article.entity';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiCreatedResponse({ description: 'Creates new Article', type: Article })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/create')
  createArticle(
    @Body() data: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.createArticle(data, user);
  }

  @Post(':id/publish')
  @ApiCreatedResponse({ description: 'Publishes new Article', type: Article })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  publishArticle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: PublishArticleDto,
    @GetUser() user: User,
  ) {
    return this.articleService.publishArticle(data, id, user);
  }

  @Post(':id/update')
  @ApiCreatedResponse({ description: 'Updates new Article', type: Article })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateArticle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateArticleDto,
    @GetUser() user: User,
  ) {
    return this.articleService.updateArticle(data, id, user);
  }

  @Patch(':id/revision/:revId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiDefaultResponse({
    description: 'Updates revision of article',
    type: Article,
  })
  setRevision(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('revId', new ParseUUIDPipe()) revId: string,
    @GetUser() user: User,
  ) {
    return this.articleService.setRevision(id, revId, user);
  }

  @Get('/all')
  @ApiDefaultResponse({
    description: 'Gets all articles',
  })
  getAllArticles(@Query() query: ArticleQuerry) {
    return this.articleService.getAllArticles(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiDefaultResponse({
    description: 'Gets article by id',
    type: Article,
  })
  getArticleById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.articleService.getArticleById(id, user);
  }
}
