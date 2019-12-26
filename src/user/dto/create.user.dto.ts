import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email address of user must be unique',
    required: true,
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @ApiPropertyOptional()
  lastName: string;

  @IsString()
  @ApiProperty({
    required: true,
    description:
      'Password mus be at least 8 chars long and contain uppercase and special character',
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  password: string;
}
