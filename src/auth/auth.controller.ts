import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AccessToken } from './dto/access.token';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @ApiCreatedResponse({ description: 'Creates new user', type: AccessToken })
  login(@Body() data: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(data);
  }
}
