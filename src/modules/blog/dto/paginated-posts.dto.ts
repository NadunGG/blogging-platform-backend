import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../models/post.model';

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  items: Post[];

  @Field({ nullable: true })
  lastKey?: string;
}
