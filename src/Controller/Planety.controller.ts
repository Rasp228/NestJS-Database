import {Body, Controller, Get, Param, Post, Query, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Planety } from 'src/Entity/Planety.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { GwiazdyService } from 'src/Service/Gwiazdy.service';
import { UserRole } from 'src/Service/users.service';
import {PlanetyService} from '../Service/Planety.service';

@Controller('Planety')
export class PlanetyController {
  constructor(private readonly PlanetyService: PlanetyService, readonly GwiazdyService: GwiazdyService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res, @Query() query) {
      const planety = await this.PlanetyService.findAll(query.fraza);
      const gwiazdy = await this.GwiazdyService.findAll();
      return res.render('Planety', { planety, user, gwiazdy });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const planeta = await this.PlanetyService.findOneWithksiezyce(params.id);
    if (!planeta) {
      throw new HttpException('Resource not found!', 404);
    }
    if (planeta.ksiezyce.length || planeta.zwierzeta.length || planeta.rosliny.length || planeta.krysztaly_i_mineraly) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.PlanetyService.remove(params.id);
    res.status(200).redirect('/Planety/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('planety_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findOneWithksiezyce(params.id);
    let gwiazda = await this.GwiazdyService.findAll();
    if (!planeta) {
      planeta = new Planety();
    }
    return res.render('planety_formularz', { planeta, gwiazda });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('nazwa') nazwa: string, @Body('ID_Gwiazdy') ID_Gwiazdy: number, @Body('Typ') Typ: string, @Body('Rzadkosc') Rzadkosc: string, @Body('Teren') Teren: string, @Body('Flora') Flora: string, @Body('Fauna') Fauna: string, @Body('Straznicy') Straznicy: string) {
    const planeta = new Planety();
    planeta.Nazwa = nazwa;
    planeta.ID_Gwiazdy = ID_Gwiazdy;
    planeta.Typ = Typ;
    planeta.Rzadkosc = Rzadkosc;
    planeta.Teren = Teren;
    planeta.Flora = Flora;
    planeta.Fauna = Fauna;
    planeta.Straznicy = Straznicy;
    this.PlanetyService.save(planeta);
    return res.status(200).redirect('/Planety/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(
    @Res() res,
    @Body('Straznicy') Straznicy: string,
    @Body('Fauna') Fauna: string,
    @Body('Flora') Flora: string,
    @Body('Teren') Teren: string,
    @Body('Rzadkosc') Rzadkosc: string,
    @Body('Typ') Typ: string,
    @Body('Nazwa') Nazwa: string,
    @Body('ID_Gwiazdy') ID_Gwiazdy: number,
    @Body('ID') ID: number,
  ) {
    const planeta = await this.PlanetyService.findOneWithksiezyce(ID);
    if (!planeta) {
      throw new HttpException('Resource not found!', 404);
    }
    planeta.Straznicy = Straznicy;
    planeta.Fauna = Fauna;
    planeta.Flora = Flora;
    planeta.Teren = Teren;
    planeta.Rzadkosc = Rzadkosc;
    planeta.Typ = Typ;
    planeta.Nazwa = Nazwa;
    planeta.ID = ID;
    planeta.ID_Gwiazdy = ID_Gwiazdy;
    this.PlanetyService.update(planeta);
    return res.status(200).redirect('/Planety/lista');
  }
}