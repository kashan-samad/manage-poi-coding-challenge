import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'admin',
      password: bcrypt.hashSync('password', 10),
    },
  ];

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
