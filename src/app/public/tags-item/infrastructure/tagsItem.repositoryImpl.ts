import { ItemsData } from 'src/typs/itemsData';
import { TagsItemRepository } from '../domain/tagsItem.repository';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsItemRepositoryImpl implements TagsItemRepository {
  constructor(private readonly httpService: HttpService) {}
  async getItemsFromTag(id: string): Promise<ItemsData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return this.convertResponseData(response.data);
        }),
      ),
    );
  }

  private buildUrl(id: string): string {
    console.log(id);
    return `https://qiita.com/api/v2/items?per_page=100&query=tags:${id}`;
  }

  private convertResponseData(dataList): Array<ItemsData> {
    console.dir(dataList.length);
    return dataList.map((data) => {
      const result: ItemsData = {
        body: data.body,
        id: data.id,
        likes_count: data.likes_count,
        private: data.private,
        reactions_count: data.reactions_count,
        stocks_count: data.stocks_count,
        tags: data.tags,
        title: data.title,
        url: data.url,
        page_views_count: data.page_views_count,
      };
      return result;
    });
  }
}
