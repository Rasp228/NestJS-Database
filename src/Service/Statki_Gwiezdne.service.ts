import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statki_Gwiezdne } from '../Entity/Statki_Gwiezdne.entity';

@Injectable()
export class Statki_GwiezdneService {
  constructor(
    @InjectRepository(Statki_Gwiezdne)
    private Statki_GwiezdneRepository: Repository<Statki_Gwiezdne>,
  ) {}

  findAll(): Promise<Statki_Gwiezdne[]> {
    return this.Statki_GwiezdneRepository.find();
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
}