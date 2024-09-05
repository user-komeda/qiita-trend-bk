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
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ItemsRepository = Symbol('ItemsRepository')
