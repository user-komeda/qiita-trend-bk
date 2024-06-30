import { Test } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { CommentModule } from './comment.module'
import { CommentController } from './application/comment.controller'
import { CommentService } from './domain/comment.service'
import { CommentRepository } from './domain/comment.repository'
import { CommentRepositoryImpl } from './infrastructure/comment.repositoryImpl'

describe('commentModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [CommentModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(CommentController)).toBeInstanceOf(CommentController)
    expect(module.get(CommentService)).toBeInstanceOf(CommentService)
    expect(module.get(CommentRepository)).toBeInstanceOf(CommentRepositoryImpl)
  })
})
