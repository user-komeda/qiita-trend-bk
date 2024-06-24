import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../domain/items.repository';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { ItemsData } from 'src/typs/itemsData';

@Injectable()
export class ItemsRepositoryImpl implements ItemsRepository {
  constructor(private readonly httpService: HttpService) {}
  async getItems(): Promise<ItemsData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl()).pipe(
        map((response) => {
          return this.convertResponseData(response.data);
        }),
      ),
    );
  }

  private buildUrl(): string {
    return 'https://qiita.com/api/v2/items?sort=stock&per_page=100&query=created%3A%3E%3D2020-01-01+created%3A%3C%3D2020-01-31';
  }

  private convertResponseData(dataList: any): Array<ItemsData> {
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
