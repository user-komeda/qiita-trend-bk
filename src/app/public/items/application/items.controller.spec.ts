import { HttpModule } from '@nestjs/axios'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsData } from '@/types/itemsData'
import { ItemsDetailRepository } from '@/public/itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '@/public/itemsdetail/domain/itemsDetail.service'
import { ItemsRepository } from '@/public/items/domain/items.repository'
import { ItemsService } from '@/public/items/domain/items.service'
import { ItemsRepositoryImpl } from '@/public/items/infrastructure/items.repositoryImpl'
import { ItemsController } from '@/public/items/application/items.controller'

const FIRST_MOCK_DATA_INDEX = 0

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
  itemsController: ItemsController,
  itemService: ItemsService,
): Promise<void> => {
  vi.spyOn(itemService, 'getItems').mockImplementationOnce(() => {
    return Promise.resolve(mockData)
  })
  const result = await itemsController.getAllItems('2021-01-01', '2021-01-31')
  expect(itemService.getItems).toHaveBeenCalled()
  expect(result).toEqual(result)
}
const testCase2 = async (
  itemsController: ItemsController,
  itemDetailService: ItemsDetailService,
): Promise<void> => {
  const requestData = { itemsId: 'e37caf50776e00e733be' }

  vi.spyOn(itemDetailService, 'getDetailItems').mockImplementationOnce(() => {
    return Promise.resolve(mockData[FIRST_MOCK_DATA_INDEX])
  })
  const result = await itemsController.getItem(requestData)
  expect(itemDetailService.getDetailItems).toHaveBeenCalled()
  expect(result).toEqual(result)
}

describe('itemController', () => {
  let itemsController: ItemsController
  let itemService: ItemsService
  let itemDetailService: ItemsDetailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ItemsController],
      providers: [
        ItemsService,
        ItemsDetailService,
        { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
        { provide: ItemsDetailRepository, useClass: ItemsRepositoryImpl },
      ],
    }).compile()

    itemsController = module.get<ItemsController>(ItemsController)
    itemService = module.get<ItemsService>(ItemsService)
    itemDetailService = module.get<ItemsDetailService>(ItemsDetailService)
    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }))
    await app.init()
  })

  test('should return "Hello World!"', async () => {
    expect(testCase(itemsController, itemService)).toBeTruthy()
  })
  test('2should return "Hello World!"', async () => {
    expect(testCase2(itemsController, itemDetailService)).toBeTruthy()
  })
})
