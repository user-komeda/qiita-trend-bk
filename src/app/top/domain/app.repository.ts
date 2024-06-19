import { ItemsData } from 'src/typs/itemsData';

export interface AppRepository {
  getItems(): Promise<ItemsData[]>;
}
export const AppRepository = Symbol('AppRepository');
