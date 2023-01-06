import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Statki_Gwiezdne {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Cena: number

    @Column()
    Klasa: string

    @Column()
    Typ_Statku: string

    @Column()
    Ilosc_slotow_technologii: number

    @Column()
    Zasieg_hipernapendu: string
}