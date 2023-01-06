import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { Ksiezyce } from "./Ksiezyce.entity"
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

    @ManyToOne(() => Planety, (planeta: Planety) => planeta.Krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Planety'})
    Krysztal_i_mineral: Planety

    @ManyToOne(() => Ksiezyce, (ksiezyc: Ksiezyce) => ksiezyc.Krysztaly_i_mineraly)
    @JoinColumn({name: 'ID_Ksiezyca'})
    Krysztal_i_mineral_ks: Ksiezyce
}