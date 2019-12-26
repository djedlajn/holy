import { IsInt, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleRevisionDto } from 'src/article-revision/dto/create.article.revision.dto';

export class CreateArticleDto extends CreateArticleRevisionDto {
  @IsOptional()
  @IsInt()
  @ApiProperty()
  revisions: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  published: boolean;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  currentRevision: string;
}
