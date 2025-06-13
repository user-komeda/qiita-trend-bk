import { Inject, Injectable } from '@nestjs/common'

import { TagData } from '@/types/tagData'
import { TagRepository } from '@/public/tag/domain/tag.repository'

/**
 *TagService
 */
@Injectable()
export class TagService {
  constructor(
    @Inject(TagRepository) private readonly tagRepository: TagRepository,
  ) {}
  /**
   *すべてのタグを取得
   */
  getTags(): Promise<TagData[]> {
    return this.tagRepository.getTags()
  }
}
