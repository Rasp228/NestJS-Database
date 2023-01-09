import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ksiezyce } from '../Entity/Ksiezyce.entity';

@Injectable()
export class KsiezyceService {
  constructor(
    @InjectRepository(Ksiezyce)
    private KsiezyceRepository: Repository<Ksiezyce>,
  ) {}

  findAll(): Promise<Ksiezyce[]> {
    return this.KsiezyceRepository.find();
  }

  async findOneWithKsiezyce(ID: number): Promise<Ksiezyce> {
    const collection = await this.KsiezyceRepository.find({
      where: { ID },
      relations: { krysztaly_i_mineraly : true, rosliny : true },
    });
    return collection.pop();
  }

  findOne(ID: number): Promise<Ksiezyce> {
    return this.KsiezyceRepository.findOneBy({ ID });
  }

  async remove(id: string): Promise<void> {
    await this.KsiezyceRepository.delete(id);
  }

  async save(Ksiezyc: Ksiezyce): Promise<Ksiezyce> {
    return await this.KsiezyceRepository.save(Ksiezyc);
  }

  async update(Ksiezyc: Ksiezyce): Promise<void>{
    await this.KsiezyceRepository.update({ID:Ksiezyc.ID}, {Nazwa:Ksiezyc.Nazwa, Typ:Ksiezyc.Typ, ID_Planety:Ksiezyc.ID_Planety})
  }
}