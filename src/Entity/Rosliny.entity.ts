import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Ksiezyce } from "./Ksiezyce.entity"
import { Materialy_Rosliny } from "./Materialy-Rosliny.entity"
import { Planety } from "./Planety.entity"

@Entity()
export class Rosliny {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    ID_Planety: number

    @Column()
    ID_Ksiezyca: number

    @Column()
    Rodzaj: string

    @Column()
    Dieta: string

    @Column()
    Wiek: string

    @Column()
    Korzenie: string

    @Column()
    Typ: string

    @Column()
    Notatka: string

    @ManyToOne(() => Ksiezyce, (ksiezyc: Ksiezyce) => ksiezyc.rosliny)
    @JoinColumn({name: 'ID_Ksiezyca'})
    ksiezyc: Ksiezyce

    @ManyToOne(() => Planety, (planeta: Planety) => planeta.rosliny)
    @JoinColumn({name: 'ID_Planety'})
    planeta: Planety

    @OneToMany(() => Materialy_Rosliny, (materialy_rosliny) => materialy_rosliny.roslina)
    @JoinColumn()
    materialy_rosliny: Materialy_Rosliny[];
}