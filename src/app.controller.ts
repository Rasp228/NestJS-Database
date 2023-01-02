import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GalaktykiService } from './Service/Galaktyki.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
  
    return this.appService.getHello();
  }
}
