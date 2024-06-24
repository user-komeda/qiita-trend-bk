import { ItemsData } from 'src/typs/itemsData';

export interface ItemsDetailRepository {
  getDetailItems(id: string): Promise<ItemsData>;
}
export const ItemsDetailRepository = Symbol('ItemsDetailRepository');
