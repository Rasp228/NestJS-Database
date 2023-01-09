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
      relations: { materialy_krysztaly_i_mineraly: true, materialy_rosliny: true, materialy_zwierzeta: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Materialy> {
    return this.MaterialyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.MaterialyRepository.delete(id);
  }

  async save(Material: Materialy): Promise<Materialy> {
    return await this.MaterialyRepository.save(Material);
  }

  async update(Material: Materialy): Promise<void>{
    await this.MaterialyRepository.update({ID:Material.ID}, {Nazwa:Material.Nazwa, Wartosc:Material.Wartosc, Rzadkosc:Material.Rzadkosc, Grupa:Material.Grupa})
  }
}