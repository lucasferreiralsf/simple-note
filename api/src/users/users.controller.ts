import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query('page') page?, @Query('perPage') perPage?) {
    return await this.usersService.getAll(page, perPage);
  }

}
