import { Controller, Body, Post, Delete, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { DeleteUserDto } from './dto/delete.user.dto';
import { PatchUserDto } from './dto/patch.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
  @Delete(':id')
  deleteUser(@Param() data: DeleteUserDto) {
    return this.userService.deleteUser(data);
  }

  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() data: PatchUserDto) {
    this.userService.patchUser(data, id);
  }
}
