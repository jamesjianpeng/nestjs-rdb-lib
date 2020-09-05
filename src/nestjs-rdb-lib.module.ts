import { NestjsRdbLibService } from './nestjs-rdb-lib.service';
import { DynamicModule, Module } from '@nestjs/common';
import { IOptions } from './interface'
import { OPTIONS } from './constants'

@Module({
  providers: [NestjsRdbLibService],
  exports: [NestjsRdbLibService],
})
export class NestjsRdbLibModule {
  static register(options: IOptions): DynamicModule {
    return {
      module: NestjsRdbLibModule,
      providers: [
        {
          provide: OPTIONS,
          useValue: options,
        },
        NestjsRdbLibService
      ],
      exports: [NestjsRdbLibService],
    };
  }
}
