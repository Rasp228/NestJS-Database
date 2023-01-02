import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

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
}