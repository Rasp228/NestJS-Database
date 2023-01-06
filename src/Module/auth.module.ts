import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users.module';
import { AuthService } from '../Service/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { SessionSerializer } from '../auth/session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
