import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from '../domain/comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get(':id')
  getItemComment(@Param('id') id: string) {
    return this.commentService.getItemComment(id);
  }
}
