import { IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ArticleStatus } from '../enum/article.status.enum';

export class ArticleQuerry {
  @IsOptional()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;
}
