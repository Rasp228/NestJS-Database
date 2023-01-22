import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
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
  async delete(@User() user, @Res() res, @Param() params) {
    const uzytkownik = await this.UsersService.findOne(params.id);

    if(uzytkownik.Login == "Admin"){
      return res.status(200).redirect('/error/3');
    }

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

    return res.render('users_rejestracja', { layout: 'main_without_login', uzytkownik });
  }

  @Post('/uzytkownicy/add')
  async add(@Res() res, @Body('nazwa') Login: string,@Body('password') password: string) {
    let uzytkownik2 = await this.UsersService.findOne(Login);
    console.log(uzytkownik2);
    if(uzytkownik2){
      return res.status(200).redirect('/error/2');
    }
    const uzytkownik = new UzytkownicyEntity();
    uzytkownik.Login = Login;
    uzytkownik.Password = password;
    uzytkownik.Role = UserRole.User;
    this.UsersService.save(uzytkownik);
    return res.status(200).redirect('/login');
  }
/*
  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(
    @Res() res,
    @Body('password') password: string,
    @Body('nazwa') Login: string,
  ) {
    const uzytkownik = await this.UsersService.findOne(Login);

    if (!uzytkownik) {
      throw new HttpException('Resource not found!', 404);
    }
    uzytkownik.Role = UserRole.User;
    uzytkownik.Password = password;
    uzytkownik.Login = Login;
    this.UsersService.update(uzytkownik);
    return res.status(200).redirect('/uzytkownicy/lista');
  }*/
}
