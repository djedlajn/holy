import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { JwtPayload } from './dto/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: LoginUserDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validatePassword(data);
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
