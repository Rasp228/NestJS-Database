import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: string, haslo: string): Promise<any> {
    const uzytkownik = await this.usersService.findOne(login);
    if (uzytkownik && uzytkownik.Password === haslo) {
      const { Password, ...result } = uzytkownik;
      return result;
    }
    return null;
  }
}
