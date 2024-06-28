import { Controller, Get, Param } from '@nestjs/common'

import { CommentService } from '../domain/comment.service'

/**
 *CommentController
 */
@Controller('')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  /**
   *記事についているコメントをすべて取得
   *
   * @param id - 記事のid
   */
  @Get()
  getItemComment(@Param('itemsId') id: string): Promise<string[]> {
    return this.commentService.getItemComment(id)
  }
}
