import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rosliny } from '../Entity/Rosliny.entity';
import { RoslinyController } from '../Controller/Rosliny.controller';
import { RoslinyService } from '../Service/Rosliny.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rosliny])],
  controllers: [RoslinyController],
  providers: [RoslinyService],
})
export class RoslinyModule {}