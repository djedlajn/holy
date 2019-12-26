import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { DeleteUserDto } from './dto/delete.user.dto';
import { PatchUserDto } from './dto/patch.user.dto';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import User from './entity/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'Creates new user', type: User })
  @Post('/register')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }
  @Delete(':id')
  @ApiBearerAuth()
  @ApiDefaultResponse({ description: 'Deletes user' })
  deleteUser(@Param() data: DeleteUserDto) {
    return this.userService.deleteUser(data);
  }

  @Patch(':id')
  @ApiDefaultResponse({ description: 'Updates user', type: User })
  @ApiBearerAuth()
  patchUser(
    @Param('id') id: string,
    @Body() data: PatchUserDto,
  ): Promise<User> {
    return this.userService.patchUser(data, id);
  }
}
