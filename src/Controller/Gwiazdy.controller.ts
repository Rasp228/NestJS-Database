import {Body, Controller, Get, Param, Post, Render, Res, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {GwiazdyService} from '../Service/Gwiazdy.service';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from 'src/Service/users.service';
import { User } from '../decorators/user.decorator';
import { Gwiazdy } from 'src/Entity/Gwiazdy.entity';
import { GalaktykiService } from 'src/Service/Galaktyki.service';

@Controller('Gwiazdy')
export class GwiazdyController {
  constructor(private readonly GwiazdyService: GwiazdyService, readonly GalaktykiService: GalaktykiService ) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res) {
      const gwiazdy = await this.GwiazdyService.findAll();
      const galaktyki = await this.GalaktykiService.findAll();
      return res.render('Gwiazdy', { gwiazdy, user, galaktyki });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const gwiazda = await this.GwiazdyService.findOneWithPlanets(params.id);
    if (!gwiazda) {
      throw new HttpException('Resource not found!', 404);
    }
    if (gwiazda.planety.length) {
      res.status(200).redirect('/error/1');
      return;
    }
    await this.GwiazdyService.remove(params.id);
    res.status(200).redirect('/Gwiazdy/lista');
  }
  
  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('gwiazdy_formularz/:id')
  async addUpdateForm(@Res() res, @Param() params) {
    let gwiazda = await this.GwiazdyService.findOneWithPlanets(params.id);
    let galaktyki = await this.GalaktykiService.findAll();
    if (!gwiazda) {
      gwiazda = new Gwiazdy();
    }
    return res.render('gwiazdy_formularz', { gwiazda, galaktyki });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('add')
  async add(@Res() res, @Body('nazwa') nazwa: string, @Body('ID_Galaktyki') ID_Galaktyki: number) {
    const gwiazda = new Gwiazdy();
    gwiazda.Nazwa = nazwa;
    gwiazda.ID_Galaktyki = ID_Galaktyki;
    this.GwiazdyService.save(gwiazda);
    return res.status(200).redirect('/Gwiazdy/lista');
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Post('update')
  async update(
    @Res() res,
    @Body('ID_Galaktyki') ID_Galaktyki: number,
    @Body('nazwa') nazwa: string,
    @Body('ID') ID: number,
  ) {
    const gwiazda = await this.GwiazdyService.findOneWithPlanets(ID);

    if (!gwiazda) {
      throw new HttpException('Resource not found!', 404);
    }
    gwiazda.Nazwa = nazwa;
    gwiazda.ID_Galaktyki = ID_Galaktyki;
    gwiazda.ID = ID;
    this.GwiazdyService.update(gwiazda);
    return res.status(200).redirect('/Gwiazdy/lista');
  }
}
