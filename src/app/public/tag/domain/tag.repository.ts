import { TagData } from 'src/typs/tagData';

export interface TagRepository {
  getTags(): Promise<TagData[]>;
}
export const TagRepository = Symbol('TagRepository');
