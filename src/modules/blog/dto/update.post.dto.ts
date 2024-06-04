import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePostDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
