import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Ksiezyce } from '../Entity/Ksiezyce.entity';

@Injectable()
export class KsiezyceService {
  constructor(
    @InjectRepository(Ksiezyce)
    private KsiezyceRepository: Repository<Ksiezyce>,
  ) {}

  findAll(fraza:string = ""): Promise<Ksiezyce[]> {
    let where = {}
    if (fraza.length) {
      where = {Nazwa: Like(`%${fraza}%`)}
    }
    return this.KsiezyceRepository.find({where, relations: { planeta: true, rosliny: true, krysztaly_i_mineraly: true}});
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