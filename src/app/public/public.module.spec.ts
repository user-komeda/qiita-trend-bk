import { Test } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { PublicModule } from './public.module'
import { CommentModule } from './comment/comment.module'
import { ItemsModule } from './items/items.module'
import { TagModule } from './tag/tag.module'
import { TagsItemModule } from './tags-item/tagsItens.module'

describe('publicModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [PublicModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(ItemsModule)).toBeInstanceOf(ItemsModule)
    expect(module.get(CommentModule)).toBeInstanceOf(CommentModule)
    expect(module.get(TagModule)).toBeInstanceOf(TagModule)
    expect(module.get(TagsItemModule)).toBeInstanceOf(TagsItemModule)
  })
})
