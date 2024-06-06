import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 as uuid } from 'uuid';
import { User, UserKey } from '../../common/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User, UserKey>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const userId = uuid();
    return await this.userModel.create({ id: userId, ...createUserDto });
  }

  async findById(id: string): Promise<GetUserDto | null> {
    return await this.userModel.get({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    const userMatches = await this.userModel
      .query('username')
      .eq(username)
      .exec();
    return userMatches[0];
  }

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.userModel.scan().exec();
  }
}
