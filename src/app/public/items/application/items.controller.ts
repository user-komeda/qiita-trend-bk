import { Controller, Get, Param } from '@nestjs/common'

import { ItemsData } from 'src/types/itemsData'

import { ItemsId } from '../../../form/itemsId/itemsId'
import { ItemsDetailService } from '../../itemsdetail/domain/itemsDetail.service'
import { ItemsService } from '../domain/items.service'

/**
 *ItemsController
 */
@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly itemsDetailService: ItemsDetailService,
  ) {}

  /**
   *すべての記事を取得
   */
  @Get()
  getAllItems(): Promise<ItemsData[]> {
    return this.itemsService.getItems()
  }

  /**
   *特定の記事を取得
   *
   * @param id - 記事id
   */
  @Get(':itemsId')
  getItem(@Param('') id: ItemsId): Promise<ItemsData> {
    return this.itemsDetailService.getDetailItems(id.itemsId)
  }
}
