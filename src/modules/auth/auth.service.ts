import * as os from 'os';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  private async checkUserPassword(signedUser: User, password: string): Promise<Boolean> {
    if (signedUser.password !== password) {
      return false;
    }

    return true;
  }

  private generateToken(user: User): string {
    const payload = {
      iss: os.hostname(),
      sub: {
        id: user.id,
        email: user.email,
      }
    };

    return this.jwtService.sign(payload);
  }

  async sign(login: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findOne({ email: login.email });
      
      if (!user) {
        throw new NotFoundException(`User with email ${login.email} not found`);
      }

      const isValid = await this.checkUserPassword(user, login.password);

      if (!isValid) {
        throw new BadRequestException('The password is not invalid');
      }

      return { tokens: this.generateToken(user) };
    } catch (error) {
      throw new BadRequestException('The email/password combinaison is invalid');
    }
  }

  async refreshToken(token: string): Promise<any> {
    const user: User = await this.jwtService.verify(token);
    
    return { tokens: this.generateToken(user) };
  }
}