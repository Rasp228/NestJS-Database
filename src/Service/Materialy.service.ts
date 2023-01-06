import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materialy } from '../Entity/Materialy.entity';

@Injectable()
export class MaterialyService {
  constructor(
    @InjectRepository(Materialy)
    private MaterialyRepository: Repository<Materialy>,
  ) {}

  findAll(): Promise<Materialy[]> {
    return this.MaterialyRepository.find();
  }

  async findOneWithMaterialy(ID: number): Promise<Materialy> {
    const collection = await this.MaterialyRepository.find({
      where: { ID },
      //relations: { ksiezyce: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Materialy> {
    return this.MaterialyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.MaterialyRepository.delete(id);
  }
}