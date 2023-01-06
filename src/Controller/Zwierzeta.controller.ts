import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {ZwierzetaService} from '../Service/Zwierzeta.service';

@Controller('Zwierzeta')
export class ZwierzetaController {
  constructor(private readonly ZwierzetaService: ZwierzetaService) {}

  @Get('lista')
  @Render('Zwierzeta.hbs')
  async lista() {
    try {
      const zwierzeta = await this.ZwierzetaService.findAll();
      return { zwierzeta };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const zwierze = await this.ZwierzetaService.findOneWithZwierzeta(params.id);
    if (!zwierze) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.ZwierzetaService.remove(params.id);
    res.status(200).redirect('/Zwierzeta/lista');
  }
}
