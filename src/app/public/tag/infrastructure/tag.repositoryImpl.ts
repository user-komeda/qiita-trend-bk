import { TagRepository } from '../domain/tag.repository';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import { TagData } from 'src/typs/tagData';

@Injectable()
export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly httpService: HttpService) {}
  async getTags(): Promise<TagData[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl()).pipe(
        map((response) => {
          return this.convertResponseData(response.data);
        }),
      ),
    );
  }

  private buildUrl() {
    return 'https://qiita.com/api/v2/tags?per_page=100&sort=count';
  }

  private convertResponseData(dataList): Array<TagData> {
    return dataList.map((data) => {
      const result: TagData = {
        id: data.id,
        icon_url: data.icon_url,
      };
      return result;
    });
  }
}
