import { Inject, Injectable } from '@nestjs/common'

import { TagData } from 'src/types/tagData'

import { TagRepository } from './tag.repository'

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
