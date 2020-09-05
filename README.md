# nestjs-rdb-lib
nestjs redis 封装库
主要解决在一个 nestjs 项目中需要连接多个 redis 数据库

## 使用
- [example](https://github.com/jamesjianpeng/nestjs-rdb-lib/tree/master/example/test)

- curd.moudle.ts

```typescript
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

```

- curd.service.ts

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { NestjsRdbLibService } from '../dist';

@Injectable()
export class AppService implements OnModuleInit {
  constructor (
    private nestjsRdbLibService: NestjsRdbLibService
  ) {}

  onModuleInit () {
  }

  async test (data: { key: string, value: string }) {
    await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_1', api: 'set', opt: [data.key, data.value] })
    const value =  await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_1', api: 'get', opt: [data.key] })


    await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_2', api: 'set', opt: [data.key, data.value] })
    const value2 =  await this.nestjsRdbLibService.toPromiseRes({ key: 'sz_2', api: 'get', opt: [data.key] })

    return { key: data.key, value, value2 }
  }

  async testDb () {
    return 'testDb'
  }
}

```

## API
### getClis

> 获取所有的 client

### toPromiseRes

> 调用某个 redisClient 对应的方法进行传参调用
