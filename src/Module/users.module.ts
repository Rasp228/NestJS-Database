import { Module } from '@nestjs/common';
import { UsersService } from '../Service/users.service';
import { UsersController } from '../Controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UzytkownicyEntity } from '../Entity/Uzytkownicy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UzytkownicyEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
