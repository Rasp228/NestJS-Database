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
}