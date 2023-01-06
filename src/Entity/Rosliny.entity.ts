import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { Ksiezyce } from "./Ksiezyce.entity"
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

    @ManyToOne(() => Planety, (planety: Planety) => planety.rosliny)
    @JoinColumn({name: 'ID_Planety'})
    roslina: Planety

    @ManyToOne(() => Ksiezyce, (ksiezyce: Ksiezyce) => ksiezyce.rosliny)
    @JoinColumn({name: 'ID_Ksiezyca'})
    roslina_ks: Ksiezyce
}