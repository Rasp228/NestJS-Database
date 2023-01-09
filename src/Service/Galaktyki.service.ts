import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Galaktyki } from '../Entity/Galaktyki.entity';

@Injectable()
export class GalaktykiService {
  constructor(
    @InjectRepository(Galaktyki)
    private GalaktykiRepository: Repository<Galaktyki>,
  ) {}

  findAll(fraza:string = ""): Promise<Galaktyki[]> {
    let where = {}
    if (fraza.length) {
      where = {Nazwa: Like(`%${fraza}%`)}
    }
    return this.GalaktykiRepository.find({where});
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

  async save(Galaktyka: Galaktyki): Promise<Galaktyki> {
    return await this.GalaktykiRepository.save(Galaktyka);
  }

  async update(Galaktyka: Galaktyki): Promise<void>{
    await this.GalaktykiRepository.update({ID:Galaktyka.ID}, {Nazwa:Galaktyka.Nazwa})
  }
}
