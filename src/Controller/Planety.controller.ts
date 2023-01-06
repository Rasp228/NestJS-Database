import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {PlanetyService} from '../Service/Planety.service';

@Controller('Planety')
export class PlanetyController {
  constructor(private readonly PlanetyService: PlanetyService) {}

  @Get('lista')
  @Render('Planety.hbs')
  async lista() {
    try {
      const planety = await this.PlanetyService.findAll();
      return { planety };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const planeta = await this.PlanetyService.findOneWithPlanets(params.id);
    if (!planeta) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.PlanetyService.remove(params.id);
    res.status(200).redirect('/Planety/lista');
  }
}
