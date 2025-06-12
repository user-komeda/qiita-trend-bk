import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsData } from 'src/types/itemsData'

import { ItemsRepositoryImpl } from '../infrastructure/items.repositoryImpl'

import { ItemsRepository } from './items.repository'
import { ItemsService } from './items.service'

const mockData: ItemsData[] = [
  {
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
  },
  {
    body: 'foo bar',
    id: 'e37caf50776e00e733be',
    likesCount: 2,
    private: false,
    stocksCount: 2,
    reactionsCount: 2,
    tags: ['tagC', 'tagD'],
    title: 'foo bar',
    url: 'https://github.com/',
    pageViewsCount: 2,
  },
]

const testCase = async (
  itemService: ItemsService,
  itemsRepository: ItemsRepository,
): Promise<void> => {
  vi.spyOn(itemsRepository, 'getItems').mockImplementationOnce(() => {
    return Promise.resolve(mockData)
  })
  const result = await itemService.getItems('2021-01-01', '2021-01-31')
  expect(itemsRepository.getItems).toHaveBeenCalled()
  expect(result).toEqual(result)
}

describe('itemService', () => {
  let itemService: ItemsService
  let itemsRepository: ItemsRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ItemsService,
        { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
      ],
    }).compile()

    itemService = app.get<ItemsService>(ItemsService)
    itemsRepository = app.get<ItemsRepository>(ItemsRepository)
  })

  test('should return "Hello World!"', async () => {
    expect(testCase(itemService, itemsRepository)).toBeTruthy()
  })
})
