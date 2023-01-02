import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Zwierzeta {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    ID_Planety: number

    @Column()
    Nazwa: string

    @Column()
    Ekosystem: string

    @Column()
    Dieta: string

    @Column()
    Temperament: string

    @Column()
    Wiek: string

    @Column()
    Plec: string

    @Column()
    Wielkosc: string
}