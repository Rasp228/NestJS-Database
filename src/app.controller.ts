import {Controller, Post, UseGuards, Request, Get, Render} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('login-form')
  @Render('Formularz_logowania.hbs')
  loginForm() {
    return;
  }
}
