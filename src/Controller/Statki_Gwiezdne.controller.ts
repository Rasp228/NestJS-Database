import {Body, Controller, Get, Param, Post, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Statki_Gwiezdne } from 'src/Entity/Statki_Gwiezdne.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { UserRole } from 'src/Service/users.service';
import {Statki_GwiezdneService} from '../Service/Statki_Gwiezdne.service';

@Controller('Statki_Gwiezdne')
export class Statki_GwiezdneController {
  constructor(private readonly Statki_GwiezdneService: Statki_GwiezdneService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res) {
    const statki_gwiezdne = await this.Statki_GwiezdneService.findAll();
    return res.render('Statki_Gwiezdne', { user, statki_gwiezdne });
}

@Roles([UserRole.Admin])
@UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const statek_gwiezdny = await this.Statki_GwiezdneService.findOneWithStatki_Gwiezdne(params.id);
    if (!statek_gwiezdny) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Statki_GwiezdneService.remove(params.id);
    res.status(200).redirect('/Statki_Gwiezdne/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('statki_gwiezdne_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let statek_gwiezdny = await this.Statki_GwiezdneService.findOneWithStatki_Gwiezdne(params.id);
    if (!statek_gwiezdny) {
      statek_gwiezdny = new Statki_Gwiezdne();
    }
    return res.render('planety_formularz', { statek_gwiezdny });
  }
  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('klasa') Klasa: string, @Body('cena') Cena: number, @Body('typ') Typ: string, @Body('ilosc_slotow_technologii') ilosc_slotow: number, @Body('zasieg_hipernapendu') zasieg_hipernapendu: string) {
    const statek_gwiezdny = new Statki_Gwiezdne();
    statek_gwiezdny.Klasa = Klasa;
    statek_gwiezdny.Cena = Cena;
    statek_gwiezdny.Typ_Statku = Typ;
    statek_gwiezdny.Ilosc_slotow_technologii = ilosc_slotow;
    statek_gwiezdny.Zasieg_hipernapendu = zasieg_hipernapendu;
    this.Statki_GwiezdneService.save(statek_gwiezdny);
    return res.status(200).redirect('/Statki_Gwiezdne/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('klasa') Klasa: string, @Body('cena') Cena: number, @Body('typ') Typ: string, @Body('ilosc_slotow_technologii') ilosc_slotow: number, @Body('zasieg_hipernapendu') zasieg_hipernapendu: string) {
    const statek_gwiezdny = await this.Statki_GwiezdneService.findOneWithStatki_Gwiezdne(ID);
    if (!statek_gwiezdny) {
      throw new HttpException('Resource not found!', 404);
    }
    statek_gwiezdny.Klasa = Klasa;
    statek_gwiezdny.Cena = Cena;
    statek_gwiezdny.Typ_Statku = Typ;
    statek_gwiezdny.Ilosc_slotow_technologii = ilosc_slotow;
    statek_gwiezdny.Zasieg_hipernapendu = zasieg_hipernapendu;
    statek_gwiezdny.ID = ID;
    this.Statki_GwiezdneService.update(statek_gwiezdny);
    return res.status(200).redirect('/Statki_Gwiezdne/lista');
  }
}
