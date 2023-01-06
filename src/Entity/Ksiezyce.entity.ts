import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import { Krysztaly_i_mineraly } from "./Krysztaly_i_mineraly.entity"
import { Planety } from "./Planety.entity"
import { Rosliny } from "./Rosliny.entity"

@Entity()
export class Ksiezyce {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Nazwa: string

    @Column()
    Typ: string

    @Column()
    ID_Planety: number

    @ManyToOne(() => Planety, (planety: Planety) => planety.ksiezyce)
    @JoinColumn({name: 'ID_Planety'})
    ksiezyc: Planety

    @OneToMany(() => Rosliny, (rosliny) => rosliny.roslina)
    @JoinColumn()
    rosliny: Rosliny[];

    @OneToMany(() => Krysztaly_i_mineraly, (Krysztaly_i_mineraly) => Krysztaly_i_mineraly.Krysztal_i_mineral_ks)
    @JoinColumn()
    Krysztaly_i_mineraly: Krysztaly_i_mineraly[];
}