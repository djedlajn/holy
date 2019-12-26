import { validate } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { DeleteUserDto } from '../dto/delete.user.dto';
import { LoginUserDto } from '../dto/login.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import User from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async validatePassword(data: LoginUserDto) {
    const user = await this.findOne({ email: data.email });
    if (user && (await user.checkIfPasswordValid(data.password))) {
      return user.email;
    } else {
      return null;
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const user = new User();
      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.password = data.password;

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
