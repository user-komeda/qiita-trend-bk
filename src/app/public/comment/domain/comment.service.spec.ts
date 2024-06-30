import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { CommentRepositoryImpl } from '../infrastructure/comment.repositoryImpl'

import { CommentRepository } from './comment.repository'
import { CommentService } from './comment.service'

describe('CommentService', () => {
  let service: CommentService
  let repository: CommentRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CommentService,
        { provide: CommentRepository, useClass: CommentRepositoryImpl },
      ],
    }).compile()

    service = module.get<CommentService>(CommentService)
    repository = module.get<CommentRepositoryImpl>(CommentRepository)
  })

  it('should be defined', async () => {
    const requestData = 'e37caf50776e00e733be'
    const responseData = ['comment', 'comment2', 'comment3']
    jest.spyOn(repository, 'getItemComment').mockImplementationOnce(() => {
      return Promise.resolve(responseData)
    })
    const result = await service.getItemComment(requestData)
    expect(repository.getItemComment).toHaveBeenCalled()
    expect(result).toStrictEqual(responseData)
  })
})
