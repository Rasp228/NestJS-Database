import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('error')
export class ErrorController {
  @Get(':id')
  @Render('error.hbs')
  display(@Param() params) {
    const message = ErrorController.getMessage(params.id);
    return { message };
  }

  public static getMessage(id: string): string {
    let message = 'Something went wrong :/...';

    switch (id) {
      case '1':
        message = 'Galaxy cannot be removed because contain some stars!';
        break;
      default:
        message = 'Something went wrong :/...';
    }
    return message;
  }
}
