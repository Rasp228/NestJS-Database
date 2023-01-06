
import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {GwiazdyService} from '../Service/Gwiazdy.service';

@Controller('Gwiazdy')
export class GwiazdyController {
  constructor(private readonly GwiazdyService: GwiazdyService) {}

  @Get('lista')
  @Render('Gwiazdy.hbs')
  async lista() {
    try {
      const gwiazdy = await this.GwiazdyService.findAll();
      return { gwiazdy };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const gwiazda = await this.GwiazdyService.findOneWithPlanets(params.id);
    if (!gwiazda) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.GwiazdyService.remove(params.id);
    res.status(200).redirect('/Gwiazdy/lista');
  }
}
