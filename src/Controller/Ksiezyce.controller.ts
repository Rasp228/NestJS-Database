import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions';
import {KsiezyceService} from '../Service/Ksiezyce.service';

@Controller('Ksiezyce')
export class KsiezyceController {
  constructor(private readonly KsiezyceService: KsiezyceService) {}

  @Get('lista')
  @Render('Ksiezyce.hbs')
  async lista() {
    try {
      const ksiezyce = await this.KsiezyceService.findAll();
      return { ksiezyce };
    } catch (exception) {
      console.log('exception: ', exception);
    }
  }

  @Get('delete/:id')
  async delete(@Res() res, @Param() params) {
    const ksiezyc = await this.KsiezyceService.findOneWithKsiezyce(params.id);
    if (!ksiezyc) {
      throw new HttpException('Resource not found!', 404);
    }

    await this.KsiezyceService.remove(params.id);
    res.status(200).redirect('/Ksiezyce/lista');
  }
}
