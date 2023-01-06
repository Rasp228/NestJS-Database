import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Krysztaly_i_mineraly } from '../Entity/Krysztaly_i_mineraly.entity';

@Injectable()
export class Krysztaly_i_mineralyService {
  constructor(
    @InjectRepository(Krysztaly_i_mineraly)
    private Krysztaly_i_mineralyRepository: Repository<Krysztaly_i_mineraly>,
  ) {}

  findAll(): Promise<Krysztaly_i_mineraly[]> {
    return this.Krysztaly_i_mineralyRepository.find();
  }

  async findOneWithKrysztaly_i_mineraly(ID: number): Promise<Krysztaly_i_mineraly> {
    const collection = await this.Krysztaly_i_mineralyRepository.find({
      where: { ID },
      relations: { materialy_krysztaly_i_mineraly: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Krysztaly_i_mineraly> {
    return this.Krysztaly_i_mineralyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.Krysztaly_i_mineralyRepository.delete(id);
  }
}