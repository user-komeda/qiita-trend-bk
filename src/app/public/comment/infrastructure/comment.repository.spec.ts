import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs/internal/observable/of'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { CommentRepository } from '@/public/comment/domain/comment.repository'
import { CommentRepositoryImpl } from '@/public/comment/infrastructure/comment.repositoryImpl'

const httpServiceMockData = [
  {
    body: '仕事でよく見かけるから気になってましたが、スッキリ納得しました\n',
    createdAt: '2021-10-19T22:57:23+09:00',
    id: 'bf190e5c79a26f2391d0',
    renderedBody:
      '\u003cp\u003e仕事でよく見かけるから気になってましたが' +
      'スッキリ納得しました\u003c/p\u003e\n',
    updatedAt: '2021-10-19T22:57:23+09:00',
    user: {
      description: null,
      facebookId: null,
      followeesCount: 1,
      followersCount: 1,
      githubLoginName: null,
      id: 'ramenRizard',
      itemsCount: 0,
      linkedinId: null,
      location: null,
      name: '',
      organization: null,
      permanentId: 2122955,
      profileImageUrl:
        'https://secure.gravatar.com/avatar/66291792cb053e83963a9a495530ad61',
      teamOnly: false,
      twitterScreenName: null,
      websiteUrl: null,
    },
  },
  {
    body: 'とても分かりやすいです\n今まで曖昧な理解だったのが、この記事のおかげでしっかり理解できました！\n',
    createdAt: '2021-06-16T10:35:08+09:00',
    id: '226f6b79f14718193069',
    renderedBody:
      '\u003cp\u003eとても分かりやすいです\u003cbr\u003e\n今まで曖昧な理解だったのが、この記事のおかげでしっかり理解できました！\u003c/p\u003e\n',
    updatedAt: '2021-06-16T10:35:08+09:00',
    user: {
      description: '丹生ちゃん\r\n',
      facebookId: '',
      followeesCount: 0,
      followersCount: 1,
      githubLoginName: null,
      id: 'mochi_nibuchan',
      itemsCount: 3,
      linkedinId: '',
      location: '',
      name: '丹生ちゃん',
      organization: '',
      permanentId: 690758,
      profileImageUrl:
        'https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/690758/6098a4284188e2451cf71040eb79bc0583dc9542/large.png?1605070461',
      teamOnly: false,
      twitterScreenName: null,
      websiteUrl: '',
    },
  },
]

const testCase = async (
  httpService: HttpService,
  repository: CommentRepository,
): Promise<void> => {
  const requestData = 'e37caf50776e00e733be'
  const responseData = httpServiceMockData.map((data) => {
    return data.body
  })
  vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
    return of({
      data: httpServiceMockData,
    } as AxiosResponse)
  })
  const result = await repository.getItemComment(requestData)
  expect(httpService.get).toHaveBeenCalled()
  expect(result).toStrictEqual(responseData)
}

describe('CommentRepository', () => {
  let repository: CommentRepository
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: CommentRepository, useClass: CommentRepositoryImpl },
      ],
    }).compile()
    repository = module.get<CommentRepositoryImpl>(CommentRepository)
    httpService = module.get<HttpService>(HttpService)
  })

  test('should be defined', async () => {
    expect(testCase(httpService, repository)).toBeTruthy()
  })
})
