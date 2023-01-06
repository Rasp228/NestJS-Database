import { Module } from '@nestjs/common';
import { UsersService } from '../Service/users.service';
import { UsersController } from '../Controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
