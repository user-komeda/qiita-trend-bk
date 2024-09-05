import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { CommentController } from './application/comment.controller'
import { CommentRepository } from './domain/comment.repository'
import { CommentService } from './domain/comment.service'
import { CommentRepositoryImpl } from './infrastructure/comment.repositoryImpl'

/**
 *CommentModule
 */
@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: CommentRepository, useClass: CommentRepositoryImpl },
  ],
})
export class CommentModule {}
