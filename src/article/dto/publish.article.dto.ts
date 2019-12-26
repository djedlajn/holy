import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PublishArticleDto {
  @IsBoolean()
  @ApiProperty()
  published: boolean;
}
