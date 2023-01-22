import {Body, Controller, Get, Param, Post, Query, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Ksiezyce } from 'src/Entity/Ksiezyce.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { PlanetyService } from 'src/Service/Planety.service';
import { UserRole } from 'src/Service/users.service';
import {KsiezyceService} from '../Service/Ksiezyce.service';

@Controller('Ksiezyce')
export class KsiezyceController {
  constructor(private readonly KsiezyceService: KsiezyceService,  readonly PlanetyService: PlanetyService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res, @Query() query) {
    const ksiezyce = await this.KsiezyceService.findAll(query.fraza);
    const planety = await this.PlanetyService.findAll();
    return res.render('Ksiezyce', { planety, user, ksiezyce });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const ksiezyc = await this.KsiezyceService.findOneWithKsiezyce(params.id);
    if (!ksiezyc) {
      throw new HttpException('Resource not found!', 404);
    }
    if (ksiezyc.rosliny.length || ksiezyc.krysztaly_i_mineraly) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.KsiezyceService.remove(params.id);
    res.status(200).redirect('/Ksiezyce/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('ksiezyce_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let planeta = await this.PlanetyService.findAll();
    let ksiezyc = await this.KsiezyceService.findOneWithKsiezyce(params.id);
    if (!ksiezyc) {
      ksiezyc = new Ksiezyce();
    }
    return res.render('ksiezyce_formularz', { planeta, ksiezyc });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('Nazwa') Nazwa: string, @Body('ID_Planety') ID_Planety: number, @Body('Typ') Typ: string) {
    const ksiezyc = new Ksiezyce();
    ksiezyc.Nazwa = Nazwa;
    ksiezyc.Typ = Typ;
    ksiezyc.ID_Planety = ID_Planety;
    this.KsiezyceService.save(ksiezyc);
    return res.status(200).redirect('/Ksiezyce/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('Nazwa') Nazwa: string, @Body('ID_Planety') ID_Planety: number, @Body('Typ') Typ: string) {
    const ksiezyc = await this.KsiezyceService.findOneWithKsiezyce(ID);
    if (!ksiezyc) {
      throw new HttpException('Resource not found!', 404);
    }
    ksiezyc.Typ = Typ;
    ksiezyc.Nazwa = Nazwa;
    ksiezyc.ID = ID;
    ksiezyc.ID_Planety = ID_Planety;
    this.KsiezyceService.update(ksiezyc);
    return res.status(200).redirect('/Ksiezyce/lista');
  }
}
