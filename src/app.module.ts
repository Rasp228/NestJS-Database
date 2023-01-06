import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galaktyki } from './Entity/Galaktyki.entity';
import { GalaktykiModule } from './Module/Galaktyki.module';
import { Gwiazdy } from './Entity/Gwiazdy.entity';
import { GwiazdyModule } from './Module/Gwiazdy.module';
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
import { PlanetyModule } from './Module/Planety.module';
import { KsiezyceModule } from './Module/Ksiezyce.module';
import { Krysztaly_i_mineralyModule } from './Module/Krysztaly_i_mineraly.module';
import { Materialy_Krysztaly_i_mineralyModule } from './Module/Materialy_Krysztaly_i_mineraly.module';
import { Materialy_RoslinyModule } from './Module/Materialy_Rosliny.module';
import { Materialy_ZwierzetaModule } from './Module/Materialy_Zwierzeta.module';
import { MaterialyModule } from './Module/Materialy.module';
import { RoslinyModule } from './Module/Rosliny.module';
import { Statki_GwiezdneModule } from './Module/Statki_Gwiezdne.module';
import { ZwierzetaModule } from './Module/Zwierzeta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'Admin',
      password: 'Admin',
      database: "No Man's Sky",
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
    GwiazdyModule,
    PlanetyModule,
    KsiezyceModule,
    Krysztaly_i_mineralyModule,
    Materialy_Krysztaly_i_mineralyModule,
    Materialy_RoslinyModule,
    Materialy_ZwierzetaModule,
    MaterialyModule,
    RoslinyModule,
    Statki_GwiezdneModule,
    ZwierzetaModule,
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
