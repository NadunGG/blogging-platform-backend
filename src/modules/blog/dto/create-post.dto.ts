import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
