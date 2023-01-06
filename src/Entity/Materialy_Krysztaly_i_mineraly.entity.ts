import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Materialy_Krysztaly_i_mineraly {
    @PrimaryGeneratedColumn()
    ID_materialy_krysztaly_i_mineraly: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Krysztaly_i_mineraly: number
}

