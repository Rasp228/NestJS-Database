import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rosliny } from '../Entity/Rosliny.entity';

@Injectable()
export class RoslinyService {
  constructor(
    @InjectRepository(Rosliny)
    private RoslinyRepository: Repository<Rosliny>,
  ) {}

  findAll(): Promise<Rosliny[]> {
    return this.RoslinyRepository.find();
  }

  async findOneWithRosliny(ID: number): Promise<Rosliny> {
    const collection = await this.RoslinyRepository.find({
      where: { ID },
      //relations: { planety: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Rosliny> {
    return this.RoslinyRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.RoslinyRepository.delete(id);
  }
}