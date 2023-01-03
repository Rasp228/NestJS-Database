import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn} from "typeorm"
import { Galaktyki } from "./Galaktyki.entity"

@Entity()
export class Gwiazdy {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    ID_Galaktyki: number

    @ManyToOne(() => Galaktyki, (galaktyka: Galaktyki) => galaktyka.gwiazdy)
    @JoinColumn({name: 'ID_galaktyki'})
    galaktyka: Galaktyki
}
