import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Query(() => User)
  async findByUsername(@Args('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Query(() => User)
  async findById(@Args('id') id: string) {
    return this.userService.findById(id);
  }
  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
