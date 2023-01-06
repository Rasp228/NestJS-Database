import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm"
import { Gwiazdy } from "./Gwiazdy.entity"
import { Krysztaly_i_mineraly } from "./Krysztaly_i_mineraly.entity"
import { Ksiezyce } from "./Ksiezyce.entity"
import { Rosliny } from "./Rosliny.entity"
import { Zwierzeta } from "./Zwierzeta.entity"

@Entity()
export class Planety {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    ID_Gwiazdy: number

    @Column()
    Nazwa: string

    @Column()
    Typ: string

    @Column()
    Rzadkosc: string

    @Column()
    Teren: string

    @Column()
    Flora: string

    @Column()
    Fauna: string

    @Column()
    Straznicy: string

    @ManyToOne(() => Gwiazdy, (gwiazda: Gwiazdy) => gwiazda.planety)
    @JoinColumn({name: 'ID_Gwiazdy'})
    gwiazda: Gwiazdy

    @OneToMany(() => Ksiezyce, (ksiezyce) => ksiezyce.ksiezyc)
    @JoinColumn()
    ksiezyce: Ksiezyce[];

    @OneToMany(() => Rosliny, (rosliny) => rosliny.roslina_ks)
    @JoinColumn()
    rosliny: Rosliny[];

    @OneToMany(() => Krysztaly_i_mineraly, (Krysztaly_i_mineraly) => Krysztaly_i_mineraly.Krysztal_i_mineral)
    @JoinColumn()
    Krysztaly_i_mineraly: Krysztaly_i_mineraly[];

    @OneToMany(() => Zwierzeta, (zwierzeta) => zwierzeta.Zwierze)
    @JoinColumn()
    Zwierzeta: Zwierzeta[];
}