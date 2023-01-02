import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Materialy_Zwierzeta {
    @PrimaryGeneratedColumn()
    ID_materialy_zwierzeta: number

    @Column()
    ID_Materialy: number

    @Column()
    ID_Zwierzeta: number
}