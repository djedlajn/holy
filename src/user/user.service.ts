import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { DeleteUserDto } from './dto/delete.user.dto';
import { PatchUserDto } from './dto/patch.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(data);
  }
  deleteUser(data: DeleteUserDto) {
    return this.userRepository.deleteUser(data);
  }

  patchUser(data: PatchUserDto, id: string) {
    return this.userRepository.patchUser(data, id);
  }
}
