import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Krysztaly_i_mineraly } from '../Entity/Krysztaly_i_mineraly.entity';
import { Krysztaly_i_mineralyController } from '../Controller/Krysztaly_i_mineraly.controller';
import { Krysztaly_i_mineralyService } from '../Service/Krysztaly_i_mineraly.service';

@Module({
  imports: [TypeOrmModule.forFeature([Krysztaly_i_mineraly])],
  controllers: [Krysztaly_i_mineralyController],
  providers: [Krysztaly_i_mineralyService],
})
export class Krysztaly_i_mineralyModule {}
