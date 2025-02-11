import { Controller, Get, Param, Post,Body ,BadRequestException} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    const existingUser = await this.usersService.findByEmail(body.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    return this.usersService.register(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.validateUser(
      body.email,
      body.password,
    );
    if (!user) throw new BadRequestException('Invalid credentials');

    return { message: 'Login successful', user };
  }
}
