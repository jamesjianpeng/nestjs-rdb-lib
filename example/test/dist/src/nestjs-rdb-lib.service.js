"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsRdbLibService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const lodash_1 = __importDefault(require("lodash"));
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
let NestjsRdbLibService = class NestjsRdbLibService {
    constructor(options) {
        this.options = options;
        this.dbMap = {};
        this.cliMap = {};
        this.getClis();
    }
    onModuleInit() {
        return this.options;
    }
    async test() {
        return 'hello, nestjs rdb lib !';
    }
    async getClis() {
        const clis = this.options.map(async ({ url, key }) => {
            return { key, url, cli: await this.getCli(url) };
        });
        const res = await Promise.all(clis);
        const cliMap = {};
        res.map(({ key, cli }) => {
            cliMap[key] = cli;
        });
        this.cliMap = cliMap;
        return cliMap;
    }
    async getCliByKey(key) {
        let cli = this.cliMap[key];
        if (!cli) {
            const currentItem = lodash_1.default.find(this.options, ({ key: k }) => k === key);
            if (currentItem) {
                cli = await this.getCli(currentItem.url);
                this.cliMap[key] = cli;
            }
            else {
                console.error(`${key} is invaild key`);
            }
        }
        return cli;
    }
    async getCli(url) {
        return redis_1.default.createClient(url);
    }
    async toPromiseRes({ key, api, opt }) {
        const client = this.cliMap[key];
        const apiInstance = util_1.promisify(client[api]).bind(client);
        opt = opt || [];
        return await apiInstance(...opt);
    }
    async getDb(cliKey, db) { }
    async getCol(data) { }
};
NestjsRdbLibService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.OPTIONS)),
    __metadata("design:paramtypes", [Array])
], NestjsRdbLibService);
exports.NestjsRdbLibService = NestjsRdbLibService;
