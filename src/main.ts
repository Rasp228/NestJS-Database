import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';
import { create } from 'express-handlebars';
import { HttpExceptionFilter } from './filters/http-esception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views/layouts'),
    partialsDir: join(__dirname, '..', 'views/partials'),
  });

  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(passport.initialize());
  app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
