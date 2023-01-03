import { Injectable } from '@nestjs/common';import {UzytkownicyEntity} from "../Entity/Uzytkownicy.entity";// This should be a real class/interface representing a user entityexport type User = any;export enum UserRole {    Anonymous = 1,    User = 2,    Admin = 3,}@Injectable()export class UsersService {    // TODO replace by DB tables !!!    private readonly users = [        {            login: 'john',            haslo: 'changeme',            rola: UserRole.Admin        },        {            login: 'maria',            haslo: 'guess',            rola: UserRole.User        },    ];    async findOne(username: string): Promise<UzytkownicyEntity | undefined> {        return this.users.find(user => user.login === username) as unknown as UzytkownicyEntity;    }}