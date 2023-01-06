import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materialy_Rosliny } from '../Entity/Materialy-Rosliny.entity';

@Injectable()
export class Materialy_RoslinyService {
  constructor(
    @InjectRepository(Materialy_Rosliny)
    private Materialy_RoslinyRepository: Repository<Materialy_Rosliny>,
  ) {}

  findAll(): Promise<Materialy_Rosliny[]> {
    return this.Materialy_RoslinyRepository.find();
  }

  async findOneWithMaterialy_Rosliny(ID_materialy_rosliny: number): Promise<Materialy_Rosliny> {
    const collection = await this.Materialy_RoslinyRepository.find({
      where: { ID_materialy_rosliny },
      //relations: { ksiezyce: true },
    });
    return collection.pop();
  }

  findOne(ID_materialy_rosliny: number): Promise<Materialy_Rosliny> {
    return this.Materialy_RoslinyRepository.findOneBy({ ID_materialy_rosliny });
  }

  async remove(id: string): Promise<void> {
    await this.Materialy_RoslinyRepository.delete(id);
  }
}