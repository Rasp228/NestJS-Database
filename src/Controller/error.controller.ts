import { Controller, Get, Param, Render, Res } from '@nestjs/common';

@Controller('error')
export class ErrorController {
  @Get(':id')
  //@Render('error.hbs')
  display(@Param() params, @Res() res) {
    const message = ErrorController.getMessage(params.id);
    //return { message };
    return res.render('error', { layout: 'main_without_login', message });
  }

  public static getMessage(id: string): string {
    let message = 'Something went wrong :/...';

    switch (id) {
      case '1':
        message = 'Cannot be removed because contain some object!';
        break;
        case '2':
          message = "Uzytkownik juz istnieje";
          break;
          case '3':
            message = "Nie usuwac Admina!";
            break;
      default:
        message = 'Something went wrong :/...';
    }
    return message;
  }
}
