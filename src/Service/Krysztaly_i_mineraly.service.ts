import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Krysztaly_i_mineraly } from '../Entity/Krysztaly_i_mineraly.entity';

@Injectable()
export class Krysztaly_i_mineralyService {
  constructor(
    @InjectRepository(Krysztaly_i_mineraly)
    private Krysztaly_i_mineralyRepository: Repository<Krysztaly_i_mineraly>,
  ) {}

  findAll(fraza:string = ""): Promise<Krysztaly_i_mineraly[]> {
    let where = {}
    if (fraza.length) {
      where = {Nazwa: Like(`%${fraza}%`)}
    }
    return this.Krysztaly_i_mineralyRepository.find({where, relations: { ksiezyc: true, planeta: true }});
  }

  async findOneWithKrysztaly_i_mineraly(ID: number): Promise<Krysztaly_i_mineraly> {
    const collection = await this.Krysztaly_i_mineralyRepository.find({
      where: { ID },
      relations: { materialy_krysztaly_i_mineraly: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Krysztaly_i_mineraly> {
    return this.Krysztaly_i_mineralyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.Krysztaly_i_mineralyRepository.delete(id);
  }

  async save(krysztal_i_mineral: Krysztaly_i_mineraly): Promise<Krysztaly_i_mineraly> {
    return await this.Krysztaly_i_mineralyRepository.save(krysztal_i_mineral);
  }

  async update(krysztal_i_mineral: Krysztaly_i_mineraly): Promise<void>{
    await this.Krysztaly_i_mineralyRepository.update({ID:krysztal_i_mineral.ID}, {Nazwa:krysztal_i_mineral.Nazwa, ID_Planety:krysztal_i_mineral.ID_Planety, ID_Ksiezyca:krysztal_i_mineral.ID_Ksiezyca})
  }
}