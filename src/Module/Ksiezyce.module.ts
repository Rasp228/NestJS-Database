import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ksiezyce } from '../Entity/Ksiezyce.entity';
import { KsiezyceController } from '../Controller/Ksiezyce.controller';
import { KsiezyceService } from '../Service/Ksiezyce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ksiezyce])],
  controllers: [KsiezyceController],
  providers: [KsiezyceService],
})
export class KsiezyceModule {}