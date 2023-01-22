import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Rosliny } from '../Entity/Rosliny.entity';

@Injectable()
export class RoslinyService {
  constructor(
    @InjectRepository(Rosliny)
    private RoslinyRepository: Repository<Rosliny>,
  ) {}

  findAll(fraza:string = ""): Promise<Rosliny[]> {
    let where = {}
    if (fraza.length) {
      where = {Rodzaj: Like(`%${fraza}%`)}
    }
    return this.RoslinyRepository.find({where, relations: { ksiezyc: true, planeta: true }});
  }

  async findOneWithRosliny(ID: number): Promise<Rosliny> {
    const collection = await this.RoslinyRepository.find({
      where: { ID },
      relations: { materialy_rosliny: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Rosliny> {
    return this.RoslinyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.RoslinyRepository.delete(id);
  }

  async save(Roslina: Rosliny): Promise<Rosliny> {
    return await this.RoslinyRepository.save(Roslina);
  }

  async update(Roslina: Rosliny): Promise<void>{
    await this.RoslinyRepository.update({ID:Roslina.ID}, {Rodzaj:Roslina.Rodzaj, Dieta:Roslina.Dieta, ID_Planety:Roslina.ID_Planety, ID_Ksiezyca:Roslina.ID_Ksiezyca, Wiek:Roslina.Wiek, Korzenie:Roslina.Korzenie, Typ:Roslina.Typ, Notatka:Roslina.Notatka})
  }
}