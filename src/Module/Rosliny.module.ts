import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rosliny } from '../Entity/Rosliny.entity';
import { RoslinyController } from '../Controller/Rosliny.controller';
import { RoslinyService } from '../Service/Rosliny.service';
import { Planety } from 'src/Entity/Planety.entity';
import { Ksiezyce } from 'src/Entity/Ksiezyce.entity';
import { PlanetyService } from 'src/Service/Planety.service';
import { KsiezyceService } from 'src/Service/Ksiezyce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rosliny, Planety, Ksiezyce])],
  controllers: [RoslinyController],
  providers: [RoslinyService, PlanetyService, KsiezyceService],
})
export class RoslinyModule {}