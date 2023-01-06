import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {Materialy_ZwierzetaService} from '../Service/Materialy_Zwierzeta.service';

@Controller('Materialy_Zwierzeta')
export class Materialy_ZwierzetaController {
  constructor(private readonly Materialy_ZwierzetaService: Materialy_ZwierzetaService) {}

  @Get('lista')
  @Render('Materialy_Zwierzeta.hbs')
  async lista() {
    try {
      const materialy_zwierzeta = await this.Materialy_ZwierzetaService.findAll();
      return { materialy_zwierzeta };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const material_zwierze = await this.Materialy_ZwierzetaService.findOneWithMaterialy_Zwierzeta(params.id);
    if (!material_zwierze) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Materialy_ZwierzetaService.remove(params.id);
    res.status(200).redirect('/Materialy_Zwierzeta/lista');
  }
}
