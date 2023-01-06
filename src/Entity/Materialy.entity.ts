import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm"
import { Materialy_Rosliny } from "./Materialy-Rosliny.entity"
import { Materialy_Zwierzeta } from "./Materialy-Zwierzeta.entity"
import { Materialy_Krysztaly_i_mineraly } from "./Materialy_Krysztaly_i_mineraly.entity"

@Entity()
export class Materialy {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    Wartosc: string

    @Column()
    Rzadkosc: string

    @Column()
    Grupa: string

    @OneToMany(() => Materialy_Zwierzeta, (materialy_zwierzeta) => materialy_zwierzeta.material)
    @JoinColumn()
    materialy_zwierzeta: Materialy_Zwierzeta[];

    @OneToMany(() => Materialy_Rosliny, (materialy_rosliny) => materialy_rosliny.material)
    @JoinColumn()
    materialy_rosliny: Materialy_Rosliny[];

    @OneToMany(() => Materialy_Krysztaly_i_mineraly, (materialy_krysztaly_i_mineraly) => materialy_krysztaly_i_mineraly.material)
    @JoinColumn()
    materialy_krysztaly_i_mineraly: Materialy_Krysztaly_i_mineraly[];
}