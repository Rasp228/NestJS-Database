import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Materialy } from "./Materialy.entity"
import { Zwierzeta } from "./Zwierzeta.entity"

@Entity()
export class Materialy_Zwierzeta {
    @PrimaryGeneratedColumn()
    ID_materialy_zwierzeta: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Zwierzeta: number

    @ManyToOne(() => Zwierzeta, (zwierze: Zwierzeta) => zwierze.materialy_zwierzeta)
    @JoinColumn({name: 'ID_Zwierzeta'})
    zwierze: Zwierzeta

    @ManyToOne(() => Materialy, (material: Materialy) => material.materialy_zwierzeta)
    @JoinColumn({name: 'ID_Materialy'})
    material: Materialy
}