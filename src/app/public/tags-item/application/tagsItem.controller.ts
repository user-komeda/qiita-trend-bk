import { Controller, Get, Param } from '@nestjs/common';
import { TagsItemService } from '../domain/tagsItem.service';

@Controller('')
export class TagsItemController {
  constructor(private readonly tagsItemService: TagsItemService) {}
  @Get('')
  getItemsFromTag(@Param('tagId') id: string) {
    return this.tagsItemService.getItemsFromTag(id);
  }
}
