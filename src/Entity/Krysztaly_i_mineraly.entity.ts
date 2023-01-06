import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Ksiezyce } from "./Ksiezyce.entity"
import { Materialy_Krysztaly_i_mineraly } from "./Materialy_Krysztaly_i_mineraly.entity"
import { Planety } from "./Planety.entity"

@Entity()
export class Krysztaly_i_mineraly {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    ID_Planety: number

    @Column()
    ID_Ksiezyca: number

    @ManyToOne(() => Planety, (planeta: Planety) => planeta.krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Planety'})
    planeta: Planety

    @ManyToOne(() => Ksiezyce, (ksiezyc: Ksiezyce) => ksiezyc.krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Ksiezyca'})
    ksiezyc: Ksiezyce

    @OneToMany(() => Materialy_Krysztaly_i_mineraly, (materialy_krysztaly_i_mineraly) => materialy_krysztaly_i_mineraly.krysztal_i_mineral)
    @JoinColumn()
    materialy_krysztaly_i_mineraly: Materialy_Krysztaly_i_mineraly[];
}