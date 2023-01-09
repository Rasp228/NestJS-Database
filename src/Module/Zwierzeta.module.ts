import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zwierzeta } from '../Entity/Zwierzeta.entity';
import { ZwierzetaController } from '../Controller/Zwierzeta.controller';
import { ZwierzetaService } from '../Service/Zwierzeta.service';
import { Planety } from 'src/Entity/Planety.entity';
import { PlanetyService } from 'src/Service/Planety.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zwierzeta, Planety])],
  controllers: [ZwierzetaController],
  providers: [ZwierzetaService, PlanetyService],
})
export class ZwierzetaModule {}
