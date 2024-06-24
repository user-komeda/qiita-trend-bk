import { Controller, Get } from '@nestjs/common';
import { TagService } from '../domain/tag.service';

@Controller('')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags() {
    return this.tagService.getTags();
  }
}
