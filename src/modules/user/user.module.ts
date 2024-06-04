import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from '../../common/schemas/user.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
