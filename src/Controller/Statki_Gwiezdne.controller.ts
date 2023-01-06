import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {Statki_GwiezdneService} from '../Service/Statki_Gwiezdne.service';

@Controller('Statki_Gwiezdne')
export class Statki_GwiezdneController {
  constructor(private readonly Statki_GwiezdneService: Statki_GwiezdneService) {}

  @Get('lista')
  @Render('Statki_Gwiezdne.hbs')
  async lista() {
    try {
      const statki_gwiezdne = await this.Statki_GwiezdneService.findAll();
      return { statki_gwiezdne };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const statek_gwiezdny = await this.Statki_GwiezdneService.findOneWithStatki_Gwiezdne(params.id);
    if (!statek_gwiezdny) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Statki_GwiezdneService.remove(params.id);
    res.status(200).redirect('/Statki_Gwiezdne/lista');
  }
}
