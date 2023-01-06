import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zwierzeta } from '../Entity/Zwierzeta.entity';

@Injectable()
export class ZwierzetaService {
  constructor(
    @InjectRepository(Zwierzeta)
    private ZwierzetaRepository: Repository<Zwierzeta>,
  ) {}

  findAll(): Promise<Zwierzeta[]> {
    return this.ZwierzetaRepository.find();
  }

  async findOneWithZwierzeta(ID: number): Promise<Zwierzeta> {
    const collection = await this.ZwierzetaRepository.find({
      where: { ID },
      //relations: { ksiezyce: true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Zwierzeta> {
    return this.ZwierzetaRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.ZwierzetaRepository.delete(id);
  }
}