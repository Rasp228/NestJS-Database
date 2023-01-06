import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { Planety } from "./Planety.entity"

@Entity()
export class Zwierzeta {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    ID_Planety: number

    @Column()
    Nazwa: string

    @Column()
    Ekosystem: string

    @Column()
    Dieta: string

    @Column()
    Temperament: string

    @Column()
    Wiek: string

    @Column()
    Plec: string

    @Column()
    Wielkosc: string

    @ManyToOne(() => Planety, (planety: Planety) => planety.Zwierzeta)
    @JoinColumn({name: 'ID_Planety'})
    Zwierze: Planety
}