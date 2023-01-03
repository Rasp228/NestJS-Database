import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: string, haslo: string): Promise<any> {
    const uzytkownik = await this.usersService.findOne(login);
    if (uzytkownik && uzytkownik.haslo === haslo) {
      const { haslo, ...result } = uzytkownik;
      return result;
    }
    return null;
  }
}
