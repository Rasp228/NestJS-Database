import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planety } from '../Entity/Planety.entity';
import { PlanetyController } from '../Controller/Planety.controller';
import { PlanetyService } from '../Service/Planety.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planety])],
  controllers: [PlanetyController],
  providers: [PlanetyService],
})
export class PlanetyModule {}