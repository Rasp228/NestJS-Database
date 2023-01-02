import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Materialy_Rosliny {
    @PrimaryGeneratedColumn()
    ID_materialy_rosliny: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Rosliny: number
}