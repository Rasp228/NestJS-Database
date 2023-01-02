import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

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
}