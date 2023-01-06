import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materialy } from '../Entity/Materialy.entity';
import { MaterialyController } from '../Controller/Materialy.controller';
import { MaterialyService } from '../Service/Materialy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Materialy])],
  controllers: [MaterialyController],
  providers: [MaterialyService],
})
export class MaterialyModule {}
