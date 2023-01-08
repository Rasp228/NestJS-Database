import {Body, Controller, Get, Param, Post, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Planety } from 'src/Entity/Planety.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { UserRole } from 'src/Service/users.service';
import {PlanetyService} from '../Service/Planety.service';

@Controller('Planety')
export class PlanetyController {
  constructor(private readonly PlanetyService: PlanetyService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res) {
      const planety = await this.PlanetyService.findAll();
      return res.render('Planety', { planety, user });
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
  @Get('planety-formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findOneWithksiezyce(params.id);

    if (!planeta) {
      planeta = new Planety();
    }
    return res.render('planety_formularz', { planeta });
  }
  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('nazwa') nazwa: string) {
    const planeta = new Planety();
    planeta.Nazwa = nazwa;
    this.PlanetyService.save(planeta);
    return res.status(200).redirect('/Planety/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(
    @Res() res,
    @Body('straznicy') straznicy: string,
    @Body('fauna') fauna: string,
    @Body('flora') flora: string,
    @Body('teren') teren: string,
    @Body('rzadkosc') rzadkosc: string,
    @Body('typ') typ: string,
    @Body('nazwa') nazwa: string,
    @Body('ID') ID: number,
  ) {
    const planeta = await this.PlanetyService.findOneWithksiezyce(ID);

    if (!planeta) {
      throw new HttpException('Resource not found!', 404);
    }
    planeta.Straznicy = straznicy;
    planeta.Fauna = fauna;
    planeta.Flora = flora;
    planeta.Teren = teren;
    planeta.Rzadkosc = rzadkosc;
    planeta.Typ = typ;
    planeta.Nazwa = nazwa;
    planeta.ID = ID;
    this.PlanetyService.update(planeta);
    return res.status(200).redirect('/Galaktyki/lista');
  }
}