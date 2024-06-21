import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentController } from './application/comment.controller';
import { CommentService } from './domain/comment.service';
import { CommentRepository } from './domain/comment.repository';
import { CommentRepositoryImpl } from './infrastructure/comment.repositoryImpl';

@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: CommentRepository, useClass: CommentRepositoryImpl },
  ],
})
export class CommentModule {}
