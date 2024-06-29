import { Inject, Injectable } from '@nestjs/common'

import { ItemsData } from 'src/types/itemsData'

import { TagsItemRepository } from './tagsItem.repository'

/**
 *TagsItemService
 */
@Injectable()
export class TagsItemService {
  constructor(
    @Inject(TagsItemRepository)
    private readonly tagsItemRepository: TagsItemRepository,
  ) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  getItemsFromTag(id: string): Promise<ItemsData[]> {
    return this.tagsItemRepository.getItemsFromTag(id)
  }
}
