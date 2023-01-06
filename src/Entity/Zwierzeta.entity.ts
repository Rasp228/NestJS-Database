import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import { Materialy_Zwierzeta } from "./Materialy-Zwierzeta.entity"
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

    @ManyToOne(() => Planety, (planeta: Planety) => planeta.zwierzeta)
    @JoinColumn({name: 'ID_Planety'})
    planeta: Planety

    @OneToMany(() => Materialy_Zwierzeta, (materialy_zwierzeta) => materialy_zwierzeta.zwierze)
    @JoinColumn()
    materialy_zwierzeta: Materialy_Zwierzeta[];
}