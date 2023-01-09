import {Body, Controller, Get, Param, Post, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Krysztaly_i_mineraly } from 'src/Entity/Krysztaly_i_mineraly.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { KsiezyceService } from 'src/Service/Ksiezyce.service';
import { PlanetyService } from 'src/Service/Planety.service';
import { UserRole } from 'src/Service/users.service';
import {Krysztaly_i_mineralyService} from '../Service/Krysztaly_i_mineraly.service';

@Controller('Krysztaly_i_mineraly')
export class Krysztaly_i_mineralyController {
  constructor(private readonly Krysztaly_i_mineralyService: Krysztaly_i_mineralyService, readonly PlanetyService: PlanetyService, readonly KsiezyceService: KsiezyceService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res) {
    const krysztaly_i_mineraly = await this.Krysztaly_i_mineralyService.findAll();
    const planety = await this.PlanetyService.findAll();
    const ksiezyce = await this.KsiezyceService.findAll();
    return res.render('Krysztaly_i_mineraly', { planety, user, krysztaly_i_mineraly, ksiezyce });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const krysztal_i_mineral = await this.Krysztaly_i_mineralyService.findOneWithKrysztaly_i_mineraly(params.id);
    if (!krysztal_i_mineral) {
      throw new HttpException('Resource not found!', 404);
    }
    if (krysztal_i_mineral.materialy_krysztaly_i_mineraly.length) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.Krysztaly_i_mineralyService.remove(params.id);
    res.status(200).redirect('/Krysztaly_i_mineraly/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('krysztaly_i_mineraly_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findAll();
    let ksiezyc = await this.KsiezyceService.findAll();
    let krysztal_i_mineral = await this.Krysztaly_i_mineralyService.findOneWithKrysztaly_i_mineraly(params.id);
    if (!krysztal_i_mineral) {
      krysztal_i_mineral = new Krysztaly_i_mineraly();
    }
    return res.render('krysztaly_i_mineraly_formularz', { planeta, krysztal_i_mineral, ksiezyc });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('ID_Planety') ID_Planety: number, @Body('ID_Ksiezyca') ID_Ksiezyca: number, @Body('Nazwa') Nazwa: string) {
    const krysztal_i_mineral = new Krysztaly_i_mineraly();
    if(ID_Ksiezyca == -1){
      ID_Ksiezyca = null;
    }else if (ID_Planety == -1){
      ID_Planety = null;
    }
    krysztal_i_mineral.Nazwa = Nazwa;
    krysztal_i_mineral.ID_Ksiezyca = ID_Ksiezyca;
    krysztal_i_mineral.ID_Planety = ID_Planety;
    this.Krysztaly_i_mineralyService.save(krysztal_i_mineral);
    return res.status(200).redirect('/Krysztaly_i_mineraly/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('ID_Planety') ID_Planety: number, @Body('ID_Ksiezyca') ID_Ksiezyca: number, @Body('Nazwa') Nazwa: string) {
    const krysztal_i_mineral = await this.Krysztaly_i_mineralyService.findOneWithKrysztaly_i_mineraly(ID);
    if (!krysztal_i_mineral) {
      throw new HttpException('Resource not found!', 404);
    }
    if(ID_Ksiezyca == -1){
      ID_Ksiezyca = null;
    }else if (ID_Planety == -1){
      ID_Planety = null;
    }
    krysztal_i_mineral.Nazwa = Nazwa;
    krysztal_i_mineral.ID_Ksiezyca = ID_Ksiezyca;
    krysztal_i_mineral.ID_Planety = ID_Planety;
    krysztal_i_mineral.ID = ID;
    this.Krysztaly_i_mineralyService.update(krysztal_i_mineral);
    return res.status(200).redirect('/Krysztaly_i_mineraly/lista');
  }
}
