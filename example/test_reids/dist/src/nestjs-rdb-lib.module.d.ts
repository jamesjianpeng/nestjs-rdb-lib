import { DynamicModule } from '@nestjs/common';
import { IOptions } from './interface';
export declare class NestjsRdbLibModule {
    static register(options: IOptions): DynamicModule;
}
