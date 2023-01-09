import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planety } from '../Entity/Planety.entity';

@Injectable()
export class PlanetyService {
  constructor(
    @InjectRepository(Planety)
    private PlanetyRepository: Repository<Planety>,
  ) {}

  findAll(): Promise<Planety[]> {
    return this.PlanetyRepository.find();
  }

  async findOneWithksiezyce(ID: number): Promise<Planety> {
    const collection = await this.PlanetyRepository.find({
      where: { ID },
      relations: { ksiezyce: true, zwierzeta: true, rosliny: true, krysztaly_i_mineraly: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Planety> {
    return this.PlanetyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.PlanetyRepository.delete(id);
  }

  async save(Planeta: Planety): Promise<Planety> {
    return await this.PlanetyRepository.save(Planeta);
  }

  async update(Planeta: Planety): Promise<void>{
    await this.PlanetyRepository.update({ID:Planeta.ID}, {Nazwa:Planeta.Nazwa, Typ:Planeta.Typ, Rzadkosc:Planeta.Rzadkosc, Teren:Planeta.Teren, Flora:Planeta.Flora, Fauna:Planeta.Fauna, Straznicy:Planeta.Straznicy, ID_Gwiazdy:Planeta.ID_Gwiazdy})
  }
}