import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UzytkownicyEntity {
  @PrimaryGeneratedColumn('identity')
  login: string;

  @Column()
  haslo: string;

  @Column()
  rola: string;
}
