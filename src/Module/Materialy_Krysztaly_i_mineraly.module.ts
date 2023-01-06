import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materialy_Krysztaly_i_mineraly } from '../Entity/Materialy_Krysztaly_i_mineraly.entity';
import { Materialy_Krysztaly_i_mineralyController } from '../Controller/Materialy_Krysztaly_i_mineraly.controller';
import { Materialy_Krysztaly_i_mineralyService } from '../Service/Materialy_Krysztaly_i_mineraly.service';

@Module({
  imports: [TypeOrmModule.forFeature([Materialy_Krysztaly_i_mineraly])],
  controllers: [Materialy_Krysztaly_i_mineralyController],
  providers: [Materialy_Krysztaly_i_mineralyService],
})
export class Materialy_Krysztaly_i_mineralyModule {}
