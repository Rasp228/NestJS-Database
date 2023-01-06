import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gwiazdy } from '../Entity/Gwiazdy.entity';
import { GwiazdyController } from '../Controller/Gwiazdy.controller';
import { GwiazdyService } from '../Service/Gwiazdy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gwiazdy])],
  controllers: [GwiazdyController],
  providers: [GwiazdyService],
})
export class GwiazdyModule {}