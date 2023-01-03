import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galaktyki } from './Entity/Galaktyki.entity';
import { GalaktykiModule } from './Module/Galaktyki.module';
import { Gwiazdy } from './Entity/Gwiazdy.entity';
import { Krysztaly_i_mineraly } from './Entity/Krysztaly_i_mineraly.entity';
import { Ksiezyce } from './Entity/Ksiezyce.entity';
import { Materialy } from './Entity/Materialy.entity';
import { Materialy_Krysztaly_i_mineraly } from './Entity/Materialy_Krysztaly_i_mineraly.entity';
import { Materialy_Rosliny } from './Entity/Materialy-Rosliny.entity';
import { Materialy_Zwierzeta } from './Entity/Materialy-Zwierzeta.entity';
import { Planety } from './Entity/Planety.entity';
import { Rosliny } from './Entity/Rosliny.entity';
import { Statki_Gwiezdne } from './Entity/Statki_Gwiezdne.entity';
import { Zwierzeta } from './Entity/Zwierzeta.entity';
import { ErrorModule } from './Module/error.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { UsersModule } from './Module/users.module';
import { AuthModule } from './Module/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
     /*
           type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'Admin',
      password: 'Admin',
      database: "No Man's Sky",
      */

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Marcin.1',
      database: 'aaa',
      entities: [
        Galaktyki,
        Gwiazdy,
        Krysztaly_i_mineraly,
        Ksiezyce,
        Materialy,
        Materialy_Krysztaly_i_mineraly,
        Materialy_Rosliny,
        Materialy_Zwierzeta,
        Planety,
        Rosliny,
        Statki_Gwiezdne,
        Zwierzeta,
      ],
      synchronize: false,
      extra: {
        trustServerCertificate: true,
      },
    }),
    GalaktykiModule,
    ErrorModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
