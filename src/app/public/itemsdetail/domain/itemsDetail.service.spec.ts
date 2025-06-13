import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsData } from '@/types/itemsData'
import { ItemsDetailRepositoryImpl } from '@/public/itemsdetail/infrastructure/itemsDetail.repositoryImpl'
import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'

const testCase = async (
  itemsDetailRepository: ItemsDetailRepository,
  itemsDetailService: ItemsDetailService,
): Promise<void> => {
  const requestData = 'e37caf50776e00e733be'
  const mockData: ItemsData = {
    body: 'hello world',
    id: 'e37caf50776e00e733be',
    likesCount: 1,
    private: false,
    stocksCount: 1,
    reactionsCount: 1,
    tags: ['tagA', 'tagB'],
    title: 'hello world',
    url: 'https://github.com/',
    pageViewsCount: 1,
  }

  vi.spyOn(itemsDetailRepository, 'getDetailItems').mockImplementationOnce(
    () => {
      return Promise.resolve(mockData)
    },
  )
  const result = await itemsDetailService.getDetailItems(requestData)
  expect(itemsDetailRepository.getDetailItems).toHaveBeenCalled()
  expect(result).toEqual(mockData)
}

describe('itemDetailService', () => {
  let itemDetailService: ItemsDetailService
  let itemsDetailRepository: ItemsDetailRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ItemsDetailService,
        { provide: ItemsDetailRepository, useClass: ItemsDetailRepositoryImpl },
      ],
    }).compile()

    itemDetailService = app.get<ItemsDetailService>(ItemsDetailService)
    itemsDetailRepository = app.get<ItemsDetailRepository>(
      ItemsDetailRepository,
    )
  })

  test('should return "Hello World!"', async () => {
    expect(testCase(itemsDetailRepository, itemDetailService)).toBeTruthy()
  })
})
