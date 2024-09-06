import { ItemsData } from 'src/types/itemsData'

/**
 *TagsItemRepository
 */
export interface TagsItemRepository {
  /**
   *tagから記事を取得
   */
  getItemsFromTag(id: string): Promise<ItemsData[]>
}
/** TagsItemRepository */
export const TagsItemRepository = Symbol('TagsItemRepository')
