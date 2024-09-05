import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, lastValueFrom } from 'rxjs'

import { TagData } from 'src/types/tagData'

import { TagRepository } from '../domain/tag.repository'

/**
 *TagRepositoryImpl
 */
@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *すべてのtagを取得
   */
  async getTags(): Promise<TagData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl()).pipe(
        map((response) => {
          return this.convertResponseData(response.data)
        }),
      ),
    )
  }

  private buildUrl(): string {
    return 'https://qiita.com/api/v2/tags?per_page=100&sort=count'
  }

  private convertResponseData(dataList): TagData[] {
    return dataList.map((data) => {
      /**
       *result
       */
      const result: TagData = {
        id: data.id,
        iconUrl: data.icon_url,
      }
      return result
    })
  }
}
