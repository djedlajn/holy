import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDraftDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  tags: string[];
}
