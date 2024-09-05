import { Inject, Injectable } from '@nestjs/common'

import { ItemsData } from 'src/types/itemsData'

import { ItemsRepository } from './items.repository'

/**
 *ItemsService
 */
@Injectable()
export class ItemsService {
  constructor(
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}
  /**
   *すべての記事を取得
   */
  async getItems(): Promise<ItemsData[]> {
    return this.itemsRepository.getItems()
  }
}
