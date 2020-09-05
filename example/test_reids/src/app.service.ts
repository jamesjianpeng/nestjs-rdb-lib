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
