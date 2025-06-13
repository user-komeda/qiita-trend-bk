import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { describe, test, expect, vi, beforeEach } from 'vitest'

import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentService } from '@/public/comment/domain/comment.service'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'
import { CommentController } from '@/public/comment/application/comment.controller'
const testCase1 = async (
  controller: CommentController,
  service: CommentService,
): Promise<void> => {
  const requestData = { itemsId: 'e37caf50776e00e733be' }
  const responseData = ['comment', 'comment2', 'comment3']
  vi.spyOn(service, 'getItemComment').mockImplementationOnce(() => {
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

    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    await app.init()
  })

  test('should be defined', async () => {
    expect(testCase1(controller, service)).toBeTruthy()
  })
})
