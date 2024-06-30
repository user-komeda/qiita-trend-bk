import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { ItemsData } from 'src/types/itemsData'

import { ItemsDetailRepositoryImpl } from '../infrastructure/itemsDetail.repositoryImpl'

import { ItemsDetailRepository } from './itemsDetail.repository'
import { ItemsDetailService } from './itemsDetail.service'

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

  it('should return "Hello World!"', async () => {
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
      .spyOn(itemsDetailRepository, 'getDetailItems')
      .mockImplementationOnce(() => {
        return Promise.resolve(mockData)
      })
    const result = await itemDetailService.getDetailItems(requestData)
    expect(itemsDetailRepository.getDetailItems).toHaveBeenCalled()
    expect(result).toEqual(mockData)
  })
})
