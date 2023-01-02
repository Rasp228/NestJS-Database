import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

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
    Strażnicy: string
}