import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statki_Gwiezdne } from '../Entity/Statki_Gwiezdne.entity';
import { Statki_GwiezdneController } from '../Controller/Statki_Gwiezdne.controller';
import { Statki_GwiezdneService } from '../Service/Statki_Gwiezdne.service';

@Module({
  imports: [TypeOrmModule.forFeature([Statki_Gwiezdne])],
  controllers: [Statki_GwiezdneController],
  providers: [Statki_GwiezdneService],
})
export class Statki_GwiezdneModule {}
