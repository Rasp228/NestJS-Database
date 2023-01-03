
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galaktyki } from '../Entity/Galaktyki.entity';
import { GalaktykiController } from '../Controller/Galaktyki.controller';
import { GalaktykiService } from '../Service/Galaktyki.service';

@Module({
  imports: [TypeOrmModule.forFeature([Galaktyki])],
  controllers: [GalaktykiController],
  providers: [GalaktykiService],
})
export class GalaktykiModule {}
