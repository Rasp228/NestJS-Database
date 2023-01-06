import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {Materialy_Krysztaly_i_mineralyService} from '../Service/Materialy_Krysztaly_i_mineraly.service';

@Controller('Materialy_Krysztaly_i_mineraly')
export class Materialy_Krysztaly_i_mineralyController {
  constructor(private readonly Materialy_Krysztaly_i_mineralyService: Materialy_Krysztaly_i_mineralyService) {}

  @Get('lista')
  @Render('Materialy_Krysztaly_i_mineraly.hbs')
  async lista() {
    try {
      const materialy_krysztaly_i_mineraly = await this.Materialy_Krysztaly_i_mineralyService.findAll();
      return { materialy_krysztaly_i_mineraly };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const material_krysztal_i_mineral = await this.Materialy_Krysztaly_i_mineralyService.findOneWithMaterialy_Krysztaly_i_mineraly(params.id);
    if (!material_krysztal_i_mineral) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Materialy_Krysztaly_i_mineralyService.remove(params.id);
    res.status(200).redirect('/Materialy_Krysztaly_i_mineraly/lista');
  }
}
