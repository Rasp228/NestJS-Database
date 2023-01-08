import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Uzytkownicy")
export class UzytkownicyEntity {
  @PrimaryGeneratedColumn('identity')
  Login: string;

  @Column()
  Password: string;

  @Column()
  Role: string;
}
