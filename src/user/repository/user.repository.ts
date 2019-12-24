import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import { validate } from 'class-validator';
import { DeleteUserDto } from '../dto/delete.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: CreateUserDto) {
    try {
      const user = new User();
      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;

      const errors = await validate(user);

      await user.save();

      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async patchUser(data: PatchUserDto, id: string) {
    const user = await this.findOneOrFail({ id });

    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    await user.save();
    return user;
  }

  async deleteUser(data: DeleteUserDto) {
    await this.delete({ id: data.id });
  }
}
