import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}
  getItemComment(id: string) {
    return this.commentRepository.getItemComment(id);
  }
}
