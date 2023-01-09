import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gwiazdy } from '../Entity/Gwiazdy.entity';

@Injectable()
export class GwiazdyService {
  constructor(
    @InjectRepository(Gwiazdy)
    private GwiazdyRepository: Repository<Gwiazdy>,
  ) {}

  findAll(): Promise<Gwiazdy[]> {
    return this.GwiazdyRepository.find();
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