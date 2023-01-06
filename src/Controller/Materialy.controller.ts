import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {MaterialyService} from '../Service/Materialy.service';

@Controller('Materialy')
export class MaterialyController {
  constructor(private readonly MaterialyService: MaterialyService) {}

  @Get('lista')
  @Render('Materialy.hbs')
  async lista() {
    try {
      const materialy = await this.MaterialyService.findAll();
      return { materialy };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const material = await this.MaterialyService.findOneWithMaterialy(params.id);
    if (!material) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.MaterialyService.remove(params.id);
    res.status(200).redirect('/Materialy/lista');
  }
}
