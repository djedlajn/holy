import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  lastName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}
