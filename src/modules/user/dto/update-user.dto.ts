import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profileImageUrl?: string;
}
