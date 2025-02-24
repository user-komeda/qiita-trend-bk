import { Controller, Get, Param, Query } from '@nestjs/common'

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
   *getAllItems
   *
   * @param startDate - startDate
   *
   * @param endDate - endDate
   *
   * @returns - ItemsData[]
   */
  @Get()
  getAllItems(
    @Query('startDate')
    startDate: string,
    @Query('endDate')
    endDate: string,
  ): Promise<ItemsData[]> {
    return this.itemsService.getItems(startDate, endDate)
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
