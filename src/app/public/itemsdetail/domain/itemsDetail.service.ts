import { Inject, Injectable } from '@nestjs/common'

import { ItemsData } from 'src/types/itemsData'

import { ItemsDetailRepository } from './itemsDetail.repository'

/**
 *ItemsDetailService
 */
@Injectable()
export class ItemsDetailService {
  constructor(
    @Inject(ItemsDetailRepository)
    private readonly itemsDetailRepository: ItemsDetailRepository,
  ) {}
  /**
   *特定の記事を取得
   *
   * @param id - 記事ID
   */
  getDetailItems(id: string): Promise<ItemsData> {
    return this.itemsDetailRepository.getDetailItems(id)
  }
}
