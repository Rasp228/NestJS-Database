import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materialy_Krysztaly_i_mineraly } from '../Entity/Materialy_Krysztaly_i_mineraly.entity';

@Injectable()
export class Materialy_Krysztaly_i_mineralyService {
  constructor(
    @InjectRepository(Materialy_Krysztaly_i_mineraly)
    private Materialy_Krysztaly_i_mineralyRepository: Repository<Materialy_Krysztaly_i_mineraly>,
  ) {}

  findAll(): Promise<Materialy_Krysztaly_i_mineraly[]> {
    return this.Materialy_Krysztaly_i_mineralyRepository.find();
  }

  async findOneWithMaterialy_Krysztaly_i_mineraly(ID_materialy_krysztaly_i_mineraly: number): Promise<Materialy_Krysztaly_i_mineraly> {
    const collection = await this.Materialy_Krysztaly_i_mineralyRepository.find({
         where: { ID_materialy_krysztaly_i_mineraly },
    });
    return collection.pop();
  }

  findOne(ID_materialy_krysztaly_i_mineraly: number): Promise<Materialy_Krysztaly_i_mineraly> {
    return this.Materialy_Krysztaly_i_mineralyRepository.findOneBy({ ID_materialy_krysztaly_i_mineraly });
  }

  async remove(ID_materialy_krysztaly_i_mineraly: string): Promise<void> {
    await this.Materialy_Krysztaly_i_mineralyRepository.delete(ID_materialy_krysztaly_i_mineraly);
  }
}