import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  tags: string[];
}
