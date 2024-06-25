import { ItemsData } from 'src/typs/itemsData';

export interface TagsItemRepository {
  getItemsFromTag(id: string): Promise<ItemsData[]>;
}
export const TagsItemRepository = Symbol('TagsItemRepository');
