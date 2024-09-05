import { ItemsData } from 'src/types/itemsData'

/**
 *ItemsDetailRepository
 */
export interface ItemsDetailRepository {
  /**
   *特定の記事を取得
   */
  getDetailItems(id: string): Promise<ItemsData>
}
/** ItemsDetailRepository */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ItemsDetailRepository = Symbol('ItemsDetailRepository')
