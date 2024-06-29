import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'

import { ItemsData } from 'src/types/itemsData'

import { TagsItemRepository } from '../domain/tagsItem.repository'

/**
 *TagsItemRepositoryImpl
 */
@Injectable()
export class TagsItemRepositoryImpl implements TagsItemRepository {
  constructor(private readonly httpService: HttpService) {}
  /**
   *tagから記事を取得
   *
   * @param id - tagId
   */
  async getItemsFromTag(id: string): Promise<ItemsData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return this.convertResponseData(response.data)
        }),
      ),
    )
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items?per_page=100&query=tags:${id}`
  }

  private convertResponseData(dataList): ItemsData[] {
    return dataList.map((data) => {
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
        tags: data.tags,
        title: data.title,
        url: data.url,
        pageViewsCount: data.page_views_count,
      }
      return result
    })
  }
}
