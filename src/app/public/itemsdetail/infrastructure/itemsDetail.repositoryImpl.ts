import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'

import { ItemsData } from 'src/types/itemsData'

import { ItemsDetailRepository } from '../domain/itemsDetail.repository'

/**
 *ItemsDetailRepositoryImpl
 */
@Injectable()
export class ItemsDetailRepositoryImpl implements ItemsDetailRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *特定の記事を取得
   *
   * @param id - 記事ID
   */
  async getDetailItems(id: string): Promise<ItemsData> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return this.convertResponseData(response.data)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}`
  }

  private convertResponseData(data): ItemsData {
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
  }
}
