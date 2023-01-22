import {Body, Controller, Get, Param, Post, Query, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Zwierzeta } from 'src/Entity/Zwierzeta.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { PlanetyService } from 'src/Service/Planety.service';
import { UserRole } from 'src/Service/users.service';
import {ZwierzetaService} from '../Service/Zwierzeta.service';

@Controller('Zwierzeta')
export class ZwierzetaController {
  constructor(private readonly ZwierzetaService: ZwierzetaService, readonly PlanetyService: PlanetyService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res, @Query() query) {
    const zwierzeta = await this.ZwierzetaService.findAll(query.fraza);
    const planety = await this.PlanetyService.findAll();
    return res.render('Zwierzeta', { planety, user, zwierzeta });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const zwierze = await this.ZwierzetaService.findOneWithZwierzeta(params.id);
    if (!zwierze) {
      throw new HttpException('Resource not found!', 404);
    }
    if (zwierze.materialy_zwierzeta.length) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.ZwierzetaService.remove(params.id);
    res.status(200).redirect('/Zwierzeta/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('zwierzeta_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findAll();
    let zwierze = await this.ZwierzetaService.findOneWithZwierzeta(params.id);
    if (!zwierze) {
      zwierze = new Zwierzeta();
    }
    return res.render('zwierzeta_formularz', { planeta, zwierze });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('Nazwa') Nazwa: string, @Body('ID_Planety') ID_Planety: number, @Body('Ekosystem') Ekosystem: string, @Body('Dieta') Dieta: string, @Body('Temperament') Temperament: string, @Body('Wiek') Wiek: string, @Body('Plec') Plec: string, @Body('Wielkosc') Wielkosc: string) {
    const zwierze = new Zwierzeta();
    zwierze.Nazwa = Nazwa;
    zwierze.Ekosystem = Ekosystem;
    zwierze.Dieta = Dieta;
    zwierze.Temperament = Temperament;
    zwierze.Wiek = Wiek;
    zwierze.Plec = Plec;
    zwierze.Wielkosc = Wielkosc;
    zwierze.ID_Planety = ID_Planety;
    this.ZwierzetaService.save(zwierze);
    return res.status(200).redirect('/Zwierzeta/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('Nazwa') Nazwa: string, @Body('ID_Planety') ID_Planety: number, @Body('Ekosystem') Ekosystem: string, @Body('Dieta') Dieta: string, @Body('Temperament') Temperament: string, @Body('Wiek') Wiek: string, @Body('Plec') Plec: string, @Body('Wielkosc') Wielkosc: string) {
    const zwierze = await this.ZwierzetaService.findOneWithZwierzeta(ID);
    if (!zwierze) {
      throw new HttpException('Resource not found!', 404);
    }
    zwierze.Nazwa = Nazwa;
    zwierze.Ekosystem = Ekosystem;
    zwierze.Dieta = Dieta;
    zwierze.Temperament = Temperament;
    zwierze.Wiek = Wiek;
    zwierze.Plec = Plec;
    zwierze.Wielkosc = Wielkosc;
    zwierze.ID_Planety = ID_Planety;
    zwierze.ID = ID;
    this.ZwierzetaService.update(zwierze);
    return res.status(200).redirect('/Zwierzeta/lista');
  }
}
