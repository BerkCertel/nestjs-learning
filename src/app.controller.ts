import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { logger } from './common/logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
