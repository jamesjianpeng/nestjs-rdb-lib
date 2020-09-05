import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import settings from '../settings.json'
import { NestjsRdbLibModule } from '../dist'

@Module({
  imports: [
    NestjsRdbLibModule.register([
      { url: settings.redis_sz_1, key: 'sz_1' },
      { url: settings.redis_sz_2, key: 'sz_2' }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
