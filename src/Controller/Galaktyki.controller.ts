import { Controller, Get, Render, Param, Res, Request,Redirect } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { GalaktykiService } from '../Service/Galaktyki.service';

@Controller('Galaktyki')
export class GalaktykiController {
  constructor(private readonly GalaktykiService: GalaktykiService) {}

  @Get('lista')
  @Render('Galaktyki.hbs')
    async lista() {
        const galaktyki = await this.GalaktykiService.findAll();
        let html = '';
        galaktyki.forEach(galaktyka => {
            //galaktyka.gwiaza.len
        })
        return {galaktyki};
  }

  @Get('delete/:id')

   async delete(@Res() res, @Param() params) {
      const galktyka = await this.GalaktykiService.findOne(params.id);
      if (!galktyka) {
          throw new HttpException("Resource not found!", 404);
      }
      console.log( galktyka.gwiazdy );
      // await this.GalaktykiService.remove(params.id);
      console.log(params.id, galktyka); 
      res.status(200).redirect('/Galaktyki/lista');
  }

  @Get('login')
  @Render('Formularz_logowania.hbs')
  login() {
      return ;
  }
}
