import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { CommentRepository } from '../domain/comment.repository'
import { CommentService } from '../domain/comment.service'
import { CommentRepositoryImpl } from '../infrastructure/comment.repositoryImpl'

import { CommentController } from './comment.controller'
const testCase1 = async (controller, service): Promise<void> => {
  const requestData = 'e37caf50776e00e733be'
  const responseData = ['comment', 'comment2', 'comment3']
  jest.spyOn(service, 'getItemComment').mockImplementationOnce(() => {
    return Promise.resolve(responseData)
  })
  const result = await controller.getItemComment(requestData)
  expect(service.getItemComment).toHaveBeenCalled()
  expect(result).toBe(responseData)
}

describe('CommentController', () => {
  let controller: CommentController
  let service: CommentService

  beforeEach(async (): Promise<any> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CommentController],
      providers: [
        CommentService,
        { provide: CommentRepository, useClass: CommentRepositoryImpl },
      ],
    }).compile()

    controller = module.get<CommentController>(CommentController)
    service = module.get<CommentService>(CommentService)
  })

  it('should be defined', async () => {
    testCase1(controller, service)
  })
})
