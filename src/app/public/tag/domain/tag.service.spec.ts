import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { TagData } from 'src/types/tagData'

import { TagRepositoryImpl } from '../infrastructure/tag.repositoryImpl'

import { TagRepository } from './tag.repository'
import { TagService } from './tag.service'

const testCase = async (
  service: TagService,
  repository: TagRepository,
): Promise<void> => {
  const mockData: TagData[] = [
    {
      id: 'Python',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/0ee2c162b0573701a6baf468f4d30549f8d03e9b/medium.jpg?1660803670',
    },
    {
      id: 'JavaScript',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/12ab79a9d2e703932a2c08dc6a4bcc9fb544f5c3/medium.jpg?1650353657',
    },
    {
      id: 'AWS',
      iconUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/e92cc40a9770111ffa5833b87b3fb7e04a0a2b5e/medium.jpg?1650353581',
    },
  ]
  jest.spyOn(repository, 'getTags').mockImplementationOnce(() => {
    return Promise.resolve(mockData)
  })
  const result = await service.getTags()
  expect(result).toEqual(mockData)
  expect(repository.getTags).toHaveBeenCalled()
}

describe('TagService', () => {
  let service: TagService
  let repository: TagRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TagService,
        { provide: TagRepository, useClass: TagRepositoryImpl },
      ],
    }).compile()

    service = module.get<TagService>(TagService)
    repository = module.get<TagRepository>(TagRepository)
  })

  it('should be defined', async () => {
    expect(testCase(service, repository)).toBeTruthy()
  })
})
