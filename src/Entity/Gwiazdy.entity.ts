import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm"
import { Galaktyki } from "./Galaktyki.entity"

@Entity()
export class Gwiazdy {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    ID_Galaktyki: number

    @ManyToOne(() => Galaktyki, (galaktyki) => galaktyki.gwiazdy)
    @JoinTable()
    galaktyki: Galaktyki
}