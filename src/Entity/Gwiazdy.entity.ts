import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn} from "typeorm"
import { Galaktyki } from "./Galaktyki.entity"
import { Planety } from "./Planety.entity"

@Entity()
export class Gwiazdy {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    ID_Galaktyki: number

    @ManyToOne(() => Galaktyki, (galaktyka: Galaktyki) => galaktyka.gwiazdy)
    @JoinColumn({name: 'ID_Galaktyki'})
    galaktyka: Galaktyki

    @OneToMany(() => Planety, (planety) => planety.gwiazda)
    @JoinColumn()
    planety: Planety[];
}