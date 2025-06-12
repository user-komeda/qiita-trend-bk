import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { CommentController } from './application/comment.controller'
import { CommentModule } from './comment.module'
import { CommentRepository } from './domain/comment.repository'
import { CommentService } from './domain/comment.service'
import { CommentRepositoryImpl } from './infrastructure/comment.repositoryImpl'

describe('commentModule', () => {
  test('should compile the module', async () => {
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
