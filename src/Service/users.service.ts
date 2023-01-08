import { Injectable } from '@nestjs/common';
import {UzytkownicyEntity} from "../Entity/Uzytkownicy.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

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
}
