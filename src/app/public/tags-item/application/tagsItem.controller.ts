import { Controller, Get, Param } from '@nestjs/common'

import { ItemsData } from 'src/types/itemsData'

import { TagsItemService } from '../domain/tagsItem.service'

/**
 *TagsItemController
 */
@Controller('')
export class TagsItemController {
  constructor(private readonly tagsItemService: TagsItemService) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  @Get('')
  getItemsFromTag(@Param('tagId') id: string): Promise<ItemsData[]> {
    return this.tagsItemService.getItemsFromTag(id)
  }
}
