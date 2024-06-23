import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @Inject(TagRepository) private readonly tagRepository: TagRepository,
  ) {}
  getTags() {
    return this.tagRepository.getTags();
  }
}
