import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity("Uzytkownicy")
export class UzytkownicyEntity {
 // @PrimaryGeneratedColumn('identity')
 @PrimaryColumn()
  Login: string;

  @Column()
  Password: string;

  @Column()
  Role: number;
}
