import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import { Krysztaly_i_mineraly } from "./Krysztaly_i_mineraly.entity"
import { Planety } from "./Planety.entity"
import { Rosliny } from "./Rosliny.entity"
import { Zwierzeta } from "./Zwierzeta.entity"

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

    @ManyToOne(() => Planety, (planeta: Planety) => planeta.ksiezyce)
    @JoinColumn({name: 'ID_Planety'})
    planeta: Planety

    @OneToMany(() => Krysztaly_i_mineraly, (krysztaly_i_mineraly) => krysztaly_i_mineraly.ksiezyc)
    @JoinColumn()
    krysztaly_i_mineraly: Krysztaly_i_mineraly[];

    @OneToMany(() => Rosliny, (rosliny) => rosliny.ksiezyc)
    @JoinColumn()
    rosliny: Rosliny[];
}