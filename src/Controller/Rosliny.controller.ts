import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {RoslinyService} from '../Service/Rosliny.service';

@Controller('Rosliny')
export class RoslinyController {
  constructor(private readonly RoslinyService: RoslinyService) {}

  @Get('lista')
  @Render('Rosliny.hbs')
  async lista() {
    try {
      const rosliny = await this.RoslinyService.findAll();
      return { rosliny };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const roslina = await this.RoslinyService.findOneWithRosliny(params.id);
    if (!roslina) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.RoslinyService.remove(params.id);
    res.status(200).redirect('/Rosliny/lista');
  }
}