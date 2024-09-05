import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { ItemsData } from 'src/types/itemsData'

import { TagsItemRepositoryImpl } from '../infrastructure/tagsItem.repositoryImpl'

import { TagsItemRepository } from './tagsItem.repository'
import { TagsItemService } from './tagsItem.service'

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
  service: TagsItemService,
  repository: TagsItemRepository,
): Promise<void> => {
  const requestData = 'wifi'

  jest.spyOn(repository, 'getItemsFromTag').mockImplementationOnce(() => {
    return Promise.resolve(mockData)
  })
  const result = await service.getItemsFromTag(requestData)
  expect(result).toEqual(mockData)
  expect(repository.getItemsFromTag).toHaveBeenCalled()
}

describe('TagsItemService', () => {
  let service: TagsItemService
  let repository: TagsItemRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TagsItemService,
        { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
      ],
    }).compile()

    service = module.get<TagsItemService>(TagsItemService)
    repository = module.get<TagsItemRepository>(TagsItemRepository)
  })

  it('should be defined', async () => {
    expect(testCase(service, repository)).toBeTruthy()
  })
})
