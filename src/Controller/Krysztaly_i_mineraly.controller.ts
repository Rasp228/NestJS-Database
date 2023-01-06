import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {Krysztaly_i_mineralyService} from '../Service/Krysztaly_i_mineraly.service';

@Controller('Krysztaly_i_mineraly')
export class Krysztaly_i_mineralyController {
  constructor(private readonly Krysztaly_i_mineralyService: Krysztaly_i_mineralyService) {}

  @Get('lista')
  @Render('Krysztaly_i_mineraly.hbs')
  async lista() {
    try {
      const krysztaly_i_mineraly = await this.Krysztaly_i_mineralyService.findAll();
      return { krysztaly_i_mineraly };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const krysztal_i_mineral = await this.Krysztaly_i_mineralyService.findOneWithKrysztaly_i_mineraly(params.id);
    if (!krysztal_i_mineral) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.Krysztaly_i_mineralyService.remove(params.id);
    res.status(200).redirect('/Krysztaly_i_mineraly/lista');
  }
}
