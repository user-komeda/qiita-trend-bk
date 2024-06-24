import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../domain/comment.repository';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly httpService: HttpService) {}
  async getItemComment(id: string): Promise<string[]> {
    return await lastValueFrom(
      this.httpService.get(this.buildUrl(id)).pipe(
        map((response) => {
          return this.convertData(response.data);
        }),
      ),
    );
  }

  private buildUrl(id: string): string {
    return `https://qiita.com/api/v2/items/${id}/comments?per_page=100`;
  }

  private convertData(dataList): Array<string> {
    return dataList.map((data) => {
      return data.body;
    });
  }
}
