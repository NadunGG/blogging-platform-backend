import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { DynamooseModule } from 'nestjs-dynamoose';
import { PostSchema } from '../../common/schemas/post.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Posts',
        schema: PostSchema,
      },
    ]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
