import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class GetUserDto {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
