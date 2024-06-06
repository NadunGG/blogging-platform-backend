import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { TokenResponse } from './dto/token-response.dto';
import { GetUserDto } from '../user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<TokenResponse> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<TokenResponse> {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: GetUserDto): TokenResponse {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<GetUserDto> {
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      const user = await this.userService.findById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
