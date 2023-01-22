import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Statki_Gwiezdne } from '../Entity/Statki_Gwiezdne.entity';

@Injectable()
export class Statki_GwiezdneService {
  constructor(
    @InjectRepository(Statki_Gwiezdne)
    private Statki_GwiezdneRepository: Repository<Statki_Gwiezdne>,
  ) {}

  findAll(fraza:string = ""): Promise<Statki_Gwiezdne[]> {
    let where = {}
    if (fraza.length) {
      where = {Typ_Statku: Like(`%${fraza}%`)}
    }
    return this.Statki_GwiezdneRepository.find({where});
  }

  async findOneWithStatki_Gwiezdne(ID: number): Promise<Statki_Gwiezdne> {
    const collection = await this.Statki_GwiezdneRepository.find({
      where: { ID },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Statki_Gwiezdne> {
    return this.Statki_GwiezdneRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.Statki_GwiezdneRepository.delete(id);
  }

  async save(Statki_Gwiezdne: Statki_Gwiezdne): Promise<Statki_Gwiezdne> {
    return await this.Statki_GwiezdneRepository.save(Statki_Gwiezdne);
  }

  async update(Statki_Gwiezdne: Statki_Gwiezdne): Promise<void>{
    await this.Statki_GwiezdneRepository.update({ID:Statki_Gwiezdne.ID}, {Cena:Statki_Gwiezdne.Cena, Klasa:Statki_Gwiezdne.Klasa, Typ_Statku:Statki_Gwiezdne.Typ_Statku, Ilosc_slotow_technologii:Statki_Gwiezdne.Ilosc_slotow_technologii, Zasieg_hipernapendu:Statki_Gwiezdne.Zasieg_hipernapendu})
  }
}