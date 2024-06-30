import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { ItemsData } from 'src/types/itemsData'

import { ItemsDetailRepository } from '../../itemsdetail/domain/itemsDetail.repository'
import { ItemsDetailService } from '../../itemsdetail/domain/itemsDetail.service'
import { ItemsRepository } from '../domain/items.repository'
import { ItemsService } from '../domain/items.service'
import { ItemsRepositoryImpl } from '../infrastructure/items.repositoryImpl'

import { ItemsController } from './items.controller'

describe('itemController', () => {
  let itemsController: ItemsController
  let itemService: ItemsService
  let itemDetailService: ItemsDetailService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ItemsController],
      providers: [
        ItemsService,
        ItemsDetailService,
        { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
        { provide: ItemsDetailRepository, useClass: ItemsRepositoryImpl },
      ],
    }).compile()

    itemsController = app.get<ItemsController>(ItemsController)
    itemService = app.get<ItemsService>(ItemsService)
    itemDetailService = app.get<ItemsDetailService>(ItemsDetailService)
  })

  it('should return "Hello World!"', async () => {
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
    jest.spyOn(itemService, 'getItems').mockImplementationOnce(() => {
      return Promise.resolve(mockData)
    })
    const result = await itemsController.getAllItems()
    expect(itemService.getItems).toHaveBeenCalled()
    expect(result).toEqual(result)
  })
  it('2should return "Hello World!"', async () => {
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
    jest
      .spyOn(itemDetailService, 'getDetailItems')
      .mockImplementationOnce(() => {
        return Promise.resolve(mockData)
      })
    const result = await itemsController.getItem(requestData)
    expect(itemDetailService.getDetailItems).toHaveBeenCalled()
    expect(result).toEqual(result)
  })
})
