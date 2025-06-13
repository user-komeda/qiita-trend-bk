import { Controller, Get } from '@nestjs/common'

import { TagData } from '@/types/tagData'
import { TagService } from '@/public/tag/domain/tag.service'

/**
 *TagController
 */
@Controller('')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   *すべてのタグを取得
   */
  @Get()
  getTags(): Promise<TagData[]> {
    return this.tagService.getTags()
  }
}
