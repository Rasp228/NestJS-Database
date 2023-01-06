import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materialy_Zwierzeta } from '../Entity/Materialy-Zwierzeta.entity';
import { Materialy_ZwierzetaController } from 'src/Controller/Materialy-Zwierzeta.controller';
import { Materialy_ZwierzetaService } from '../Service/Materialy_Zwierzeta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Materialy_Zwierzeta])],
  controllers: [Materialy_ZwierzetaController],
  providers: [Materialy_ZwierzetaService],
})
export class Materialy_ZwierzetaModule {}
