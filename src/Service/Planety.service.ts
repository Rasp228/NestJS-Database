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

  async findOneWithPlanets(ID: number): Promise<Planety> {
    const collection = await this.PlanetyRepository.find({
      where: { ID },
      relations: { ksiezyce: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Planety> {
    return this.PlanetyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.PlanetyRepository.delete(id);
  }
}