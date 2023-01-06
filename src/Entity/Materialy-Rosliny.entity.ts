import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Materialy } from "./Materialy.entity"
import { Rosliny } from "./Rosliny.entity"

@Entity()
export class Materialy_Rosliny {
    @PrimaryGeneratedColumn()
    ID_materialy_rosliny: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Rosliny: number

    @ManyToOne(() => Rosliny, (roslina: Rosliny) => roslina.materialy_rosliny)
    @JoinColumn({name: 'ID_Rosliny'})
    roslina: Rosliny

    @ManyToOne(() => Materialy, (material: Materialy) => material.materialy_rosliny)
    @JoinColumn({name: 'ID_Materialy'})
    material: Materialy
}