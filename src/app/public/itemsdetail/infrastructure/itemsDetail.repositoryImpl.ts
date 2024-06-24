import { Injectable } from '@nestjs/common';
import { ItemsDetailRepository } from '../domain/itemsDetail.repository';
import { ItemsData } from 'src/typs/itemsData';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ItemsDetailRepositoryImpl implements ItemsDetailRepository {
  constructor(private readonly httpService: HttpService) {}
  async getDetailItems(id: string): Promise<ItemsData> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return this.convertResponseData(response.data);
        }),
      ),
    );
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}`;
  }

  private convertResponseData(data): ItemsData {
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
  }
}
