import { IsString, IsOptional, IsEmail } from 'class-validator';

export class PatchUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
