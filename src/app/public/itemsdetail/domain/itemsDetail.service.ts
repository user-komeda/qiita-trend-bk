import { Inject, Injectable } from '@nestjs/common';
import { ItemsDetailRepository } from './itemsDetail.repository';

@Injectable()
export class ItemsDetailService {
  constructor(
    @Inject(ItemsDetailRepository)
    private readonly itemsDetailRepository: ItemsDetailRepository,
  ) {}
  getDetailItems(id: string) {
    return this.itemsDetailRepository.getDetailItems(id);
  }
}
