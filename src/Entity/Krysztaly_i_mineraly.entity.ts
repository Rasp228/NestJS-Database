import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

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
}