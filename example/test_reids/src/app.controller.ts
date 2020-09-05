import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/testDb')
  testMdb() {
    return this.appService.testDb();
  }
  @Post('/test')
  testDb(@Body() opt: { key: string, value: string }) {
    return this.appService.test(opt);
  }
}
