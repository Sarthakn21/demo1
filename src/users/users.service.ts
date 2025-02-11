import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './user.entity';
import { types } from 'cassandra-driver';

@Injectable()
export class UsersService {
  private userModel;
  constructor(@Inject('CASSANDRA_CLIENT') private cassandraClient) {
    this.userModel = this.cassandraClient.loadSchema('users', UserSchema);
  }

  async register(username: string, email: string, password: string) {
      const hashedPassword = await bcrypt.hash(password, 10);
       const uuid = types.Uuid.fromString(uuidv4()); 
    const newUser = new this.userModel({
      id:uuid,
      username,
      email,
      password: hashedPassword,
    });

    return newUser.saveAsync();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOneAsync(
      { email },
      { allow_filtering: true },
    );
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }
}
