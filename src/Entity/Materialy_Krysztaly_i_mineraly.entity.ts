import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Krysztaly_i_mineraly } from "./Krysztaly_i_mineraly.entity"
import { Materialy } from "./Materialy.entity"

@Entity()
export class Materialy_Krysztaly_i_mineraly {
    @PrimaryGeneratedColumn()
    ID_materialy_krysztaly_i_mineraly: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Krysztaly_i_mineraly: number

    @ManyToOne(() => Krysztaly_i_mineraly, (krysztal_i_mineral: Krysztaly_i_mineraly) => krysztal_i_mineral.materialy_krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Krysztaly_i_mineraly'})
    krysztal_i_mineral: Krysztaly_i_mineraly

    @ManyToOne(() => Materialy, (material: Materialy) => material.materialy_krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Materialy'})
    material: Materialy
}