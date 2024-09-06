import { TagData } from 'src/types/tagData'

/**
 *TagRepository
 */
export interface TagRepository {
  /**
   *すべてのタグを取得
   */
  getTags(): Promise<TagData[]>
}
/** TagRepository */
export const TagRepository = Symbol('TagRepository')
