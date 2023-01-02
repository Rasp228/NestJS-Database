import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

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
}