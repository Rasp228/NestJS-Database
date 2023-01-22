import {Body, Controller, Get, Param, Post, Query, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Rosliny } from 'src/Entity/Rosliny.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { KsiezyceService } from 'src/Service/Ksiezyce.service';
import { PlanetyService } from 'src/Service/Planety.service';
import { UserRole } from 'src/Service/users.service';
import {RoslinyService} from '../Service/Rosliny.service';

@Controller('Rosliny')
export class RoslinyController {
  constructor(private readonly RoslinyService: RoslinyService, readonly PlanetyService: PlanetyService, readonly KsiezyceService: KsiezyceService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res, @Query() query) {
    const rosliny = await this.RoslinyService.findAll(query.fraza);
    const planety = await this.PlanetyService.findAll();
    const ksiezyce = await this.KsiezyceService.findAll();
    return res.render('Rosliny', { planety, user, rosliny, ksiezyce });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const roslina = await this.RoslinyService.findOneWithRosliny(params.id);
    if (!roslina) {
      throw new HttpException('Resource not found!', 404);
    }
    if (roslina.materialy_rosliny.length) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.RoslinyService.remove(params.id);
    res.status(200).redirect('/Rosliny/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('rosliny_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findAll();
    let ksiezyc = await this.KsiezyceService.findAll();
    let roslina = await this.RoslinyService.findOneWithRosliny(params.id);
    if (!roslina) {
      roslina = new Rosliny();
    }
    return res.render('rosliny_formularz', { planeta, roslina, ksiezyc });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('ID_Planety') ID_Planety: number, @Body('ID_Ksiezyca') ID_Ksiezyca: number, @Body('Rodzaj') Rodzaj: string, @Body('Dieta') Dieta: string, @Body('Korzenie') Korzenie: string, @Body('Wiek') Wiek: string, @Body('Typ') Typ: string, @Body('Notatka') Notatka: string) {
    const roslina = new Rosliny();
    if(ID_Ksiezyca == -1){
      ID_Ksiezyca = null;
    }else if (ID_Planety == -1){
      ID_Planety = null;
    }
    roslina.Rodzaj = Rodzaj;
    roslina.Dieta = Dieta;
    roslina.Wiek = Wiek;
    roslina.Korzenie = Korzenie;
    roslina.Typ = Typ;
    roslina.Notatka = Notatka;
    roslina.ID_Ksiezyca = ID_Ksiezyca;
    roslina.ID_Planety = ID_Planety;
    this.RoslinyService.save(roslina);
    return res.status(200).redirect('/Rosliny/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('ID_Planety') ID_Planety: number, @Body('ID_Ksiezyca') ID_Ksiezyca: number, @Body('Rodzaj') Rodzaj: string, @Body('Dieta') Dieta: string, @Body('Korzenie') Korzenie: string, @Body('Wiek') Wiek: string, @Body('Typ') Typ: string, @Body('Notatka') Notatka: string) {
    const roslina = await this.RoslinyService.findOneWithRosliny(ID);
    if (!roslina) {
      throw new HttpException('Resource not found!', 404);
    }
    if(ID_Ksiezyca == -1){
      ID_Ksiezyca = null;
    }else if (ID_Planety == -1){
      ID_Planety = null;
    }
    roslina.Rodzaj = Rodzaj;
    roslina.Dieta = Dieta;
    roslina.Wiek = Wiek;
    roslina.Korzenie = Korzenie;
    roslina.Typ = Typ;
    roslina.Notatka = Notatka;
    roslina.ID_Ksiezyca = ID_Ksiezyca;
    roslina.ID_Planety = ID_Planety;
    roslina.ID = ID;
    this.RoslinyService.update(roslina);
    return res.status(200).redirect('/Rosliny/lista');
  }
}