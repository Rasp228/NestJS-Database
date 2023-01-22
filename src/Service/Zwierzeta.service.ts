import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Zwierzeta } from '../Entity/Zwierzeta.entity';

@Injectable()
export class ZwierzetaService {
  constructor(
    @InjectRepository(Zwierzeta)
    private ZwierzetaRepository: Repository<Zwierzeta>,
  ) {}

  findAll(fraza:string = ""): Promise<Zwierzeta[]> {
    let where = {}
    if (fraza.length) {
      where = {Nazwa: Like(`%${fraza}%`)}
    }
    return this.ZwierzetaRepository.find({where, relations: { planeta: true, materialy_zwierzeta: true}});
  }

  async findOneWithZwierzeta(ID: number): Promise<Zwierzeta> {
    const collection = await this.ZwierzetaRepository.find({
      where: { ID },
      relations: { materialy_zwierzeta: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Zwierzeta> {
    return this.ZwierzetaRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.ZwierzetaRepository.delete(id);
  }

  async save(Zwierze: Zwierzeta): Promise<Zwierzeta> {
    return await this.ZwierzetaRepository.save(Zwierze);
  }

  async update(Zwierze: Zwierzeta): Promise<void>{
    await this.ZwierzetaRepository.update({ID:Zwierze.ID}, {Nazwa:Zwierze.Nazwa, ID_Planety:Zwierze.ID_Planety, Ekosystem:Zwierze.Ekosystem, Dieta:Zwierze.Dieta, Temperament:Zwierze.Temperament, Wiek:Zwierze.Wiek, Plec:Zwierze.Plec, Wielkosc:Zwierze.Wielkosc,})
  }
}