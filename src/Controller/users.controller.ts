import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { User } from '../decorators/user.decorator';

@Controller()
export class UsersController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res, @User() user) {
    let redirectUrl = 'login';
    if (user) {
      redirectUrl = '/Galaktyki/lista';
    }
    res.redirect(redirectUrl);
  }

  @Get('login')
  loginForm(@Res() res) {
    return res.render('Formularz_logowania', { layout: 'main_without_login' });
  }

  @Post('logout')
  logout(@Request() req, @Res() res): any {
    req.session.destroy();
    res.redirect('/login');
    return;
  }
}
