import {Body, Controller, Get, Param, Post, Query, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { Materialy } from 'src/Entity/Materialy.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { UserRole } from 'src/Service/users.service';
import {MaterialyService} from '../Service/Materialy.service';

@Controller('Materialy')
export class MaterialyController {
  constructor(private readonly MaterialyService: MaterialyService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res, @Query() query) {
    const materialy = await this.MaterialyService.findAll(query.fraza);
    return res.render('Materialy', { user, materialy });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const material = await this.MaterialyService.findOneWithMaterialy(params.id);
    if (!material) {
      throw new HttpException('Resource not found!', 404);
    }
    if (material.materialy_rosliny.length || material.materialy_zwierzeta.length || material.materialy_krysztaly_i_mineraly.length) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.MaterialyService.remove(params.id);
    res.status(200).redirect('/Materialy/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('materialy_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let material = await this.MaterialyService.findOneWithMaterialy(params.id);
    if (!material) {
      material = new Materialy();
    }
    return res.render('materialy_formularz', { material});
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('Nazwa') Nazwa: string, @Body('Wartosc') Wartosc: string, @Body('Rzadkosc') Rzadkosc: string, @Body('Grupa') Grupa: string) {
    const material = new Materialy();
    material.Nazwa = Nazwa;
    material.Wartosc = Wartosc;
    material.Rzadkosc = Rzadkosc;
    material.Grupa = Grupa;
    this.MaterialyService.save(material);
    return res.status(200).redirect('/Materialy/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(@Res() res, @Body('ID') ID: number, @Body('Nazwa') Nazwa: string, @Body('Wartosc') Wartosc: string, @Body('Rzadkosc') Rzadkosc: string, @Body('Grupa') Grupa: string) {
    const material = await this.MaterialyService.findOneWithMaterialy(ID);
    if (!material) {
      throw new HttpException('Resource not found!', 404);
    }
    material.Nazwa = Nazwa;
    material.Wartosc = Wartosc;
    material.Rzadkosc = Rzadkosc;
    material.Grupa = Grupa;
    material.ID = ID;
    this.MaterialyService.update(material);
    return res.status(200).redirect('/Materialy/lista');
  }
}
