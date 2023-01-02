import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { Gwiazdy } from "./Gwiazdy.entity";

@Entity()
export class Galaktyki {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({type: 'int'})
    Nazwa: string;

    @OneToMany(() => Gwiazdy, (gwiazdy) => gwiazdy.ID_Galaktyki)
    @JoinTable()
    gwiazdy: Gwiazdy[]
}