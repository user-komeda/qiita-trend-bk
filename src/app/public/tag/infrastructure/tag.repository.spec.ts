import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs/internal/observable/of'

import { TagData } from 'src/types/tagData'

import { TagRepository } from '../domain/tag.repository'

import { TagRepositoryImpl } from './tag.repositoryImpl'

describe('TagService', () => {
  let repository: TagRepository
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [{ provide: TagRepository, useClass: TagRepositoryImpl }],
    }).compile()

    repository = module.get<TagRepository>(TagRepository)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', async () => {
    const mockData = [
      {
        followers_count: 186271,
        icon_url:
          'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/0ee2c162b0573701a6baf468f4d30549f8d03e9b/medium.jpg?1660803670',
        id: 'Python',
        items_count: 81889,
      },
      {
        followers_count: 161272,
        icon_url:
          'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/12ab79a9d2e703932a2c08dc6a4bcc9fb544f5c3/medium.jpg?1650353657',
        id: 'JavaScript',
        items_count: 56887,
      },
      {
        followers_count: 65229,
        icon_url:
          'https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/e92cc40a9770111ffa5833b87b3fb7e04a0a2b5e/medium.jpg?1650353581',
        id: 'AWS',
        items_count: 42534,
      },
    ]
    const responseData: TagData[] = [
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
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of({
        data: mockData,
      } as AxiosResponse)
    })
    const result = await repository.getTags()
    expect(result).toEqual(responseData)
    expect(httpService.get).toHaveBeenCalled()
  })
})
