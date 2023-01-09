import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ksiezyce } from '../Entity/Ksiezyce.entity';
import { KsiezyceController } from '../Controller/Ksiezyce.controller';
import { KsiezyceService } from '../Service/Ksiezyce.service';
import { Planety } from 'src/Entity/Planety.entity';
import { PlanetyService } from 'src/Service/Planety.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ksiezyce, Planety])],
  controllers: [KsiezyceController],
  providers: [KsiezyceService, PlanetyService],
})
export class KsiezyceModule {}