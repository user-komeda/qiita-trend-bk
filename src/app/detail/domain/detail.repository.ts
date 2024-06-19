import { ItemsData } from 'src/typs/itemsData';

export interface DetailRepository {
  getDetailItems(id: string): Promise<ItemsData>;
}
export const DetailRepository = Symbol('DetailRepository');
