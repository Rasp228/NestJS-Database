import { Injectable } from '@nestjs/common';
import {UzytkownicyEntity} from "../Entity/Uzytkownicy.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";

export enum UserRole {
    Anonymous = 1,
    User = 2,
    Admin = 3,
}
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UzytkownicyEntity)
        private UzytkownikRepository: Repository<UzytkownicyEntity>,
    ) {}

    async findOne(Login: string): Promise<UzytkownicyEntity | undefined> {
        return this.UzytkownikRepository.findOneBy({ Login })
    }

    findAll(fraza:string = ""): Promise<UzytkownicyEntity[]> {
        let where = {}
        if (fraza.length) {
          where = {Login: Like(`%${fraza}%`)}
        }
        return this.UzytkownikRepository.find({where});
      }
      async remove(id: string): Promise<void> {
        await this.UzytkownikRepository.delete(id);
      }
    
      async save(Uzytkownicy: UzytkownicyEntity): Promise<UzytkownicyEntity> {
        return await this.UzytkownikRepository.save(Uzytkownicy);
      }

      async update(Uzytkownicy: UzytkownicyEntity): Promise<void>{
        await this.UzytkownikRepository.update({Login:Uzytkownicy.Login}, {Login:Uzytkownicy.Login, Password:Uzytkownicy.Password, Role:Uzytkownicy.Role})
      }
}
