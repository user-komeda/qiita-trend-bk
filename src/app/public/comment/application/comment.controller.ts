import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from '../domain/comment.service';

@Controller('')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get()
  getItemComment(@Param('itemsId') id: string) {
    return this.commentService.getItemComment(id);
  }
}
