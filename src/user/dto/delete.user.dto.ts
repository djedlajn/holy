import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @IsUUID()
  @ApiProperty({ description: 'User ID', required: true })
  id: string;
}
