import { ItemsData } from 'src/typs/itemsData';

export interface ItemsRepository {
  getItems(): Promise<ItemsData[]>;
}
export const ItemsRepository = Symbol('ItemsRepository');
