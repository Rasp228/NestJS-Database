import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { User } from '../decorators/user.decorator';
import { UserRole, UsersService } from 'src/Service/users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guards';
import { UzytkownicyEntity } from 'src/Entity/Uzytkownicy.entity';

@Controller()
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
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

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('uzytkownicy/lista')
  async lista(@User() user, @Res() res, @Query() query) {
    const uzytkownicy = await this.UsersService.findAll(query.fraza);
    return res.render('uzytkownicy', { uzytkownicy, user });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('uzytkownicy/delete/:id')
  async delete(@Res() res, @Param() params) {
    const uzytkownik = await this.UsersService.findOne(params.id);

    if (!uzytkownik) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.UsersService.remove(params.id);
    res.status(200).redirect('/uzytkownicy/lista');
  }

  @Get('/uzytkownicy/user_rejestracja/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let uzytkownik = await this.UsersService.findOne(params.id);

    if (!uzytkownik) {
      uzytkownik = new UzytkownicyEntity();
    }
    return res.render('users_rejestracja', { uzytkownik });
  }

  @Post('/uzytkownicy/add')
  async add(@Res() res, @Body('nazwa') Login: string,@Body('password') password: string) {
    const uzytkownik = new UzytkownicyEntity();
    uzytkownik.Login = Login;
    uzytkownik.Password = password;
    uzytkownik.Role = 2;
    this.UsersService.save(uzytkownik);
    return res.status(200).redirect('/login');
  }
}
