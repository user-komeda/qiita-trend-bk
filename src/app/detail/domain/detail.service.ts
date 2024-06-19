import { Inject, Injectable } from '@nestjs/common';
import { DetailRepository } from './detail.repository';

@Injectable()
export class DetailService {
  constructor(
    @Inject(DetailRepository)
    private readonly detailRepository: DetailRepository,
  ) {}
  getDetailItems(id: string) {
    return this.detailRepository.getDetailItems(id);
  }
}
