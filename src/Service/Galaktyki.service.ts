
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galaktyki } from '../Entity/Galaktyki.entity';

@Injectable()
export class GalaktykiService {
  constructor(
    @InjectRepository(Galaktyki)
    private GalaktykiRepository: Repository<Galaktyki>,
  ) {}

  findAll(): Promise<Galaktyki[]> {
    return this.GalaktykiRepository.find();
  }

  async findOneWithStars(ID: number): Promise<Galaktyki> {
    const collection = await this.GalaktykiRepository.find({
      where: { ID },
      relations: { gwiazdy: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Galaktyki> {
    return this.GalaktykiRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.GalaktykiRepository.delete(id);
  }
}
