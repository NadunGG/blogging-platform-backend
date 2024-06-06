import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/models/user.model';
import { TokenResponse } from './dto/token-response.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenResponse)
  async register(@Args('registerUserDto') registerUserDto: CreateUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Mutation(() => TokenResponse)
  async login(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Query(() => User)
  async validateToken(@Args('token') token: string) {
    return this.authService.validateToken(token);
  }
}
