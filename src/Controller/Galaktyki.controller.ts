import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { GalaktykiService } from '../Service/Galaktyki.service';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../Service/users.service';
import { User } from '../decorators/user.decorator';

@Controller('Galaktyki')
export class GalaktykiController {
  constructor(private readonly GalaktykiService: GalaktykiService) {}

  @Roles([UserRole.User, UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('lista')
  async lista(@User() user, @Res() res) {
    const galaktyki = await this.GalaktykiService.findAll();
    return res.render('Galaktyki', { galaktyki, user });
  }

  @Roles([UserRole.Admin])
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const galaktyka = await this.GalaktykiService.findOneWithStars(params.id);

    if (!galaktyka) {
      throw new HttpException('Resource not found!', 404);
    }

    if (galaktyka.gwiazdy.length) {
      res.status(200).redirect('/error/1');
      return;
    }

    await this.GalaktykiService.remove(params.id);
    res.status(200).redirect('/Galaktyki/lista');
  }
}
