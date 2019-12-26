import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleRevisionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  tags: string[];
}
