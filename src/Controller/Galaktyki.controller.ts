import {Controller, Get, Param, Render, Res, SetMetadata, UseGuards,} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {GalaktykiService} from '../Service/Galaktyki.service';
import {RolesGuard} from '../guards/roles.guards';
import {Roles} from '../decorators/roles.decorator';
import {UserRole} from '../Service/users.service';

@Controller('Galaktyki')
export class GalaktykiController {
  constructor(private readonly GalaktykiService: GalaktykiService) {}

  @Roles([UserRole.Admin, UserRole.User])
  @UseGuards(RolesGuard)
  @Get('lista')
  @Render('Galaktyki.hbs')
  async lista() {
    try {
      const galaktyki = await this.GalaktykiService.findAll();
      return { galaktyki };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const galktyka = await this.GalaktykiService.findOneWithStars(params.id);
    if (!galktyka) {
      throw new HttpException('Resource not found!', 404);
    }

    if (galktyka.gwiazdy.length) {
      res.status(200).redirect('/error/1');
      return;
    }

    await this.GalaktykiService.remove(params.id);
    res.status(200).redirect('/Galaktyki/lista');
  }
}
