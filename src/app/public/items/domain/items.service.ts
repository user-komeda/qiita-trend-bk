import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { ItemsData } from 'src/typs/itemsData';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}
  async getHello(): Promise<ItemsData[]> {
    return this.itemsRepository.getItems();
  }
}
