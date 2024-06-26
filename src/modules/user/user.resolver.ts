import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import { PaginatedUsers } from './dto/paginated-users.dto';

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

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async uploadProfileImage(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
    @Args('userId') userId: string,
  ) {
    const { createReadStream, filename, mimetype } = await file;
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      createReadStream()
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject);
    });

    return this.userService.uploadProfileImage(
      { buffer, originalname: filename, mimetype },
      userId,
    );
  }

  @Query(() => User)
  async findById(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Query(() => [PaginatedUsers])
  async getAllUsers(
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('lastKey', { type: () => String, nullable: true }) lastKey?: string,
  ): Promise<PaginatedUsers> {
    const { items, lastKey: nextKey } = await this.userService.getAllUsers(
      limit,
      lastKey,
    );
    return { items, lastKey: nextKey };
  }
}
