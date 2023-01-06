import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materialy_Zwierzeta } from '../Entity/Materialy-Zwierzeta.entity';

@Injectable()
export class Materialy_ZwierzetaService {
  constructor(
    @InjectRepository(Materialy_Zwierzeta)
    private Materialy_ZwierzetaRepository: Repository<Materialy_Zwierzeta>,
  ) {}

  findAll(): Promise<Materialy_Zwierzeta[]> {
    return this.Materialy_ZwierzetaRepository.find();
  }

  async findOneWithMaterialy_Zwierzeta(ID_materialy_zwierzeta: number): Promise<Materialy_Zwierzeta> {
    const collection = await this.Materialy_ZwierzetaRepository.find({
      where: { ID_materialy_zwierzeta },
    });
    return collection.pop();
  }

  findOne(ID_materialy_zwierzeta: number): Promise<Materialy_Zwierzeta> {
    return this.Materialy_ZwierzetaRepository.findOneBy({ ID_materialy_zwierzeta });
  }

  async remove(id: string): Promise<void> {
    await this.Materialy_ZwierzetaRepository.delete(id);
  }
}