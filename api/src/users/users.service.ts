import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { GenericService } from '../utils/generics/generic-service.generic';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { ConfigService } from '../config/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './users.schema';

@Injectable()
export class UsersService extends GenericService<IUser, UserCreateDto, UserUpdateDto> {
  constructor(private readonly configService: ConfigService, @InjectModel('User') private readonly userModel: Model<IUser>) {
    super(userModel);
  }

  async storeUser(user) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
    const userCreated = await this.create(
      user,
    );
    if (userCreated.password || userCreated.emailToken) {
      userCreated.password = undefined;
      userCreated.emailToken = undefined;
    }
    return userCreated;
  }

  async updateUser(
    field: { email: string } | { id: string },
    user,
  ) {
    const userUpdated = await this.update(
      field,
      user,
    );
    userUpdated.emailToken = undefined;
    userUpdated.password = undefined;
    return userUpdated;
  }

  async findBy(
    field: { email: string },
    withPassword: boolean = false,
  ) {
    return await this.userModel.findOne(
      field,
    );
  }

  async getAll(currentPage: string, perPage: string) {
    return await this.fetchAll(
      currentPage,
      perPage,
    );
  }
}
