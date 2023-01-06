import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materialy_Rosliny } from '../Entity/Materialy-Rosliny.entity';
import { Materialy_RoslinyController } from '../Controller/Materialy-Rosliny.controller';
import { Materialy_RoslinyService } from '../Service/Materialy_Rosliny.service';

@Module({
  imports: [TypeOrmModule.forFeature([Materialy_Rosliny])],
  controllers: [Materialy_RoslinyController],
  providers: [Materialy_RoslinyService],
})
export class Materialy_RoslinyModule {}
