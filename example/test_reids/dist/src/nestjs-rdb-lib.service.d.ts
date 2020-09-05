import { OnModuleInit } from '@nestjs/common';
import { IOptions, ICliMap, IColOption } from './interface';
export declare class NestjsRdbLibService implements OnModuleInit {
    private options;
    private dbMap;
    private cliMap;
    constructor(options: IOptions);
    onModuleInit(): IOptions;
    test(): Promise<string>;
    getClis(): Promise<ICliMap>;
    getCliByKey(key: string): Promise<any | undefined>;
    private getCli;
    toPromiseRes({ key, api, opt }: {
        key: string;
        api: string;
        opt?: string[];
    }): Promise<any>;
    getDb(cliKey: string, db: string): Promise<void>;
    getCol(data: IColOption): Promise<void>;
}
