"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestjsRdbLibModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsRdbLibModule = void 0;
const nestjs_rdb_lib_service_1 = require("./nestjs-rdb-lib.service");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let NestjsRdbLibModule = NestjsRdbLibModule_1 = class NestjsRdbLibModule {
    static register(options) {
        return {
            module: NestjsRdbLibModule_1,
            providers: [
                {
                    provide: constants_1.OPTIONS,
                    useValue: options,
                },
                nestjs_rdb_lib_service_1.NestjsRdbLibService
            ],
            exports: [nestjs_rdb_lib_service_1.NestjsRdbLibService],
        };
    }
};
NestjsRdbLibModule = NestjsRdbLibModule_1 = __decorate([
    common_1.Module({
        providers: [nestjs_rdb_lib_service_1.NestjsRdbLibService],
        exports: [nestjs_rdb_lib_service_1.NestjsRdbLibService],
    })
], NestjsRdbLibModule);
exports.NestjsRdbLibModule = NestjsRdbLibModule;
