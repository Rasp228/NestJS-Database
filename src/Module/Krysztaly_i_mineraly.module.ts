import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Krysztaly_i_mineraly } from '../Entity/Krysztaly_i_mineraly.entity';
import { Krysztaly_i_mineralyController } from '../Controller/Krysztaly_i_mineraly.controller';
import { Krysztaly_i_mineralyService } from '../Service/Krysztaly_i_mineraly.service';
import { Planety } from 'src/Entity/Planety.entity';
import { Ksiezyce } from 'src/Entity/Ksiezyce.entity';
import { PlanetyService } from 'src/Service/Planety.service';
import { KsiezyceService } from 'src/Service/Ksiezyce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Krysztaly_i_mineraly, Planety, Ksiezyce])],
  controllers: [Krysztaly_i_mineralyController],
  providers: [Krysztaly_i_mineralyService, PlanetyService, KsiezyceService],
})
export class Krysztaly_i_mineralyModule {}
