import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { Post } from './models/post.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PaginatedPosts } from './dto/paginated-posts.dto';

@Resolver('Post')
@UseGuards(JwtAuthGuard)
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

  @Query(() => PaginatedPosts)
  async getAllPosts(
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('lastKey', { type: () => String, nullable: true }) lastKey?: string,
    @Args('tagFilter', { type: () => String, nullable: true })
    tagFilter?: string,
  ): Promise<PaginatedPosts> {
    const { items, lastKey: nextKey } = await this.postService.getAllPosts(
      limit,
      lastKey,
      tagFilter,
    );
    return { items, lastKey: nextKey };
  }

  @Query(() => Post)
  async getPostById(@Args('postId') postId: string) {
    return this.postService.getPostById(postId);
  }
}
