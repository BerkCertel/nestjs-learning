import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { PostsService } from './post.service';
import { AppService } from './app.service';
import { logger } from './common/logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  getHello(): string {
    logger('test logger');
    return this.appService.getHello();
  }

  @Get('config')
  config() {
    logger('test logger');
    return {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      dbHostShown: process.env.NODE_ENV === 'development',
    };
  }

  @Get('users')
  async getUsers() {
    return this.usersService.users({});
  }

  @Get('posts')
  async getPosts() {
    return this.postsService.posts({});
  }
}
