import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ItemsData } from 'src/types/itemsData'

import { TagsItemRepository } from '../domain/tagsItem.repository'
import { TagsItemService } from '../domain/tagsItem.service'
import { TagsItemRepositoryImpl } from '../infrastructure/tagsItem.repositoryImpl'

import { TagsItemController } from './tagsItem.controller'

const mockData: ItemsData[] = [
  {
    body: 'hello world',
    id: 'e37caf50776e00e733be',
    likesCount: 1,
    private: false,
    stocksCount: 1,
    reactionsCount: 1,
    tags: ['tagA', 'tagB', 'wifi'],
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
    tags: ['tagC', 'tagD', 'wifi'],
    title: 'foo bar',
    url: 'https://github.com/',
    pageViewsCount: 2,
  },
]

const testCase = async (
  controller: TagsItemController,
  service: TagsItemService,
): Promise<void> => {
  const requestData = { tagId: 'wifi' }

  vi.spyOn(service, 'getItemsFromTag').mockImplementationOnce(() => {
    return Promise.resolve(mockData)
  })
  const result = await controller.getItemsFromTag(requestData)
  expect(result).toEqual(mockData)
  expect(service.getItemsFromTag).toHaveBeenCalled()
}

describe('TagsItemController', () => {
  let controller: TagsItemController
  let service: TagsItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TagsItemController],
      providers: [
        TagsItemService,
        { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
      ],
    }).compile()

    controller = module.get<TagsItemController>(TagsItemController)
    service = module.get<TagsItemService>(TagsItemService)
  })

  test('should be defined', async () => {
    expect(testCase(controller, service)).toBeTruthy()
  })
})
