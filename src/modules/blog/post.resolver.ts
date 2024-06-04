import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { Post } from './models/post.model';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostDto') createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Mutation(() => Post)
  async updatePost(@Args('updatePostDto') updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(updatePostDto);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') postId: string) {
    await this.postService.deletePost(postId);
    return true;
  }

  @Query(() => [Post])
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Query(() => Post)
  async getPostById(@Args('postId') postId: string) {
    return this.postService.getPostById(postId);
  }
}
