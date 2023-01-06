import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('page-not-found')
  notFound(@Res() res) {
    return res.render('404', { layout: 'main_without_login' });
  }
}
