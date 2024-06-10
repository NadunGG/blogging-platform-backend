import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, Model, Scan } from 'nestjs-dynamoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { v4 as uuid } from 'uuid';
import { Post, PostKey } from '../../common/interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<Post, PostKey>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const postId = uuid();
    const post = { id: postId, ...createPostDto };
    const postCreated = await this.postModel.create(post);
    return postCreated;
  }

  async updatePost(updatePostDto: UpdatePostDto): Promise<Post> {
    const { id, ...updateFields } = updatePostDto;

    const selectedPost = await this.getPostById(id);
    if (!selectedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatedPostMeta = {
      ...selectedPost,
      ...updateFields,
    };
    const updatedPost = await this.postModel.update(updatedPostMeta);
    return updatedPost;
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.delete({ id: postId });
  }

  async getAllPosts(
    limit: number,
    lastKey?: string,
    tagFilter?: string,
  ): Promise<{ items: Post[]; lastKey?: string }> {
    let scan: Scan<Post, PostKey>;

    if (tagFilter) {
      scan = this.postModel.scan('tags').contains(tagFilter);
    } else {
      scan = this.postModel.scan();
    }

    if (lastKey) {
      scan = scan.startAt({ id: lastKey });
    }

    const result = await scan.limit(limit).exec();

    return {
      items: result,
      lastKey: result.lastKey ? result.lastKey.id : undefined,
    };
  }

  async getPostById(postId: string): Promise<Post> {
    return await this.postModel.get({ id: postId });
  }
}
