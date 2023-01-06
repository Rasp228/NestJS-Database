import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {Materialy_RoslinyService} from '../Service/Materialy_Rosliny.service';

@Controller('Materialy_Rosliny')
export class Materialy_RoslinyController {
  constructor(private readonly Materialy_RoslinyService: Materialy_RoslinyService) {}

  @Get('lista')
  @Render('Materialy_Rosliny.hbs')
  async lista() {
    try {
      const materialy_rosliny = await this.Materialy_RoslinyService.findAll();
      return { materialy_rosliny };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const material_roslina = await this.Materialy_RoslinyService.findOneWithMaterialy_Rosliny(params.id);
    if (!material_roslina) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Materialy_RoslinyService.remove(params.id);
    res.status(200).redirect('/Materialy_Rosliny/lista');
  }
}
