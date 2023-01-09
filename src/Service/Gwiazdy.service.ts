import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Gwiazdy } from '../Entity/Gwiazdy.entity';

@Injectable()
export class GwiazdyService {
  constructor(
    @InjectRepository(Gwiazdy)
    private GwiazdyRepository: Repository<Gwiazdy>,
  ) {}

  findAll(fraza:string = ""): Promise<Gwiazdy[]> {
    let where = {}
    if (fraza.length) {
      where = {Nazwa: Like(`%${fraza}%`)}
    }
    return this.GwiazdyRepository.find({where, relations: { planety: true, galaktyka: true }});
  }

  async findOneWithPlanets(ID: number): Promise<Gwiazdy> {
    const collection = await this.GwiazdyRepository.find({
      where: { ID },
      relations: { planety: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Gwiazdy> {
    return this.GwiazdyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.GwiazdyRepository.delete(id);
  }

  async save(Gwiazda: Gwiazdy): Promise<Gwiazdy> {
    return await this.GwiazdyRepository.save(Gwiazda);
  }

  async update(Gwiazda: Gwiazdy): Promise<void>{
    await this.GwiazdyRepository.update({ID:Gwiazda.ID}, {ID_Galaktyki:Gwiazda.ID_Galaktyki, Nazwa:Gwiazda.Nazwa})
  }
}