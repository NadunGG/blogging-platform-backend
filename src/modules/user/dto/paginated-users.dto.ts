import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  items: User[];

  @Field({ nullable: true })
  lastKey?: string;
}
