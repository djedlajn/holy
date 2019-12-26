import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @IsJWT()
  @ApiProperty()
  accessToken: string;
}
