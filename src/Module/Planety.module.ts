import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planety } from '../Entity/Planety.entity';
import { PlanetyController } from '../Controller/Planety.controller';
import { PlanetyService } from '../Service/Planety.service';
import { Gwiazdy } from 'src/Entity/Gwiazdy.entity';
import { GwiazdyService } from 'src/Service/Gwiazdy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planety, Gwiazdy])],
  controllers: [PlanetyController],
  providers: [PlanetyService, GwiazdyService],
})
export class PlanetyModule {}