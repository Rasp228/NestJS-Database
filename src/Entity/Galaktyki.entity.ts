import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Gwiazdy } from './Gwiazdy.entity';

@Entity()
export class Galaktyki {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'char' })
  Nazwa: string;

  @OneToMany(() => Gwiazdy, (gwiazdy) => gwiazdy.galaktyka)
  @JoinColumn()
  gwiazdy: Gwiazdy[];
}
