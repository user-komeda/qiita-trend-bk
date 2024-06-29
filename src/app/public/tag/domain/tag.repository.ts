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
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TagRepository = Symbol('TagRepository')
