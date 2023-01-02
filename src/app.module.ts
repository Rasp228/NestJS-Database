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

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'Admin',
      password: 'Admin',
      database: "No Man's Sky",
      entities: [Galaktyki, Gwiazdy, Krysztaly_i_mineraly, Ksiezyce, Materialy, Materialy_Krysztaly_i_mineraly, Materialy_Rosliny, Materialy_Zwierzeta, Planety, Rosliny, Statki_Gwiezdne, Zwierzeta],
      synchronize: false,
      extra: {
        trustServerCertificate: true,
      }
    }),
    GalaktykiModule
  ] ,
})
export class AppModule {}