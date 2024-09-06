import { ItemsData } from 'src/types/itemsData'

/**
 *ItemsRepository
 */
export interface ItemsRepository {
  /**
   *すべての記事を取得
   */
  getItems(): Promise<ItemsData[]>
}

/** ItemsRepositorySymbol  */
export const ItemsRepository = Symbol('ItemsRepository')
