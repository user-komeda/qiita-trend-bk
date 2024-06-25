import { Inject, Injectable } from '@nestjs/common';
import { TagsItemRepository } from './tagsItem.repository';

@Injectable()
export class TagsItemService {
  constructor(
    @Inject(TagsItemRepository)
    private readonly tagsItemRepository: TagsItemRepository,
  ) {}
  getItemsFromTag(id: string) {
    return this.tagsItemRepository.getItemsFromTag(id);
  }
}
