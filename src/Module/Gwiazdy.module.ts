import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gwiazdy } from '../Entity/Gwiazdy.entity';
import { GwiazdyController } from '../Controller/Gwiazdy.controller';
import { GwiazdyService } from '../Service/Gwiazdy.service';
import { GalaktykiService } from 'src/Service/Galaktyki.service';
import { Galaktyki } from 'src/Entity/Galaktyki.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gwiazdy, Galaktyki])],
  controllers: [GwiazdyController],
  providers: [GwiazdyService, GalaktykiService],
})
export class GwiazdyModule {}