import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zwierzeta } from '../Entity/Zwierzeta.entity';
import { ZwierzetaController } from '../Controller/Zwierzeta.controller';
import { ZwierzetaService } from '../Service/Zwierzeta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zwierzeta])],
  controllers: [ZwierzetaController],
  providers: [ZwierzetaService],
})
export class ZwierzetaModule {}
