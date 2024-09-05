import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'

import { ItemsData } from 'src/types/itemsData'

import { ItemsRepository } from '../domain/items.repository'

/**
 *ItemsRepositoryImpl
 */
@Injectable()
export class ItemsRepositoryImpl implements ItemsRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *すべての記事を取得
   */
  async getItems(): Promise<ItemsData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl()).pipe(
        map((response) => {
          return this.convertResponseData(response.data)
        }),
      ),
    )
  }

  private buildUrl(): string {
    return 'https://qiita.com/api/v2/items?sort=stock&per_page=100&query=created%3A%3E%3D2020-01-01+created%3A%3C%3D2020-01-31'
  }

  private convertResponseData(dataList: any): ItemsData[] {
    return dataList.map((data) => {
      const tag = data.tags.map((tag) => {
        return tag.name
      })
      /**
       *result
       */
      const result: ItemsData = {
        body: data.body,
        id: data.id,
        likesCount: data.likes_count,
        private: data.private,
        reactionsCount: data.reactions_count,
        stocksCount: data.stocks_count,
        tags: tag,
        title: data.title,
        url: data.url,
        pageViewsCount: data.page_views_count,
      }
      return result
    })
  }
}
