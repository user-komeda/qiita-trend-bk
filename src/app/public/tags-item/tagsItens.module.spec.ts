import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { TagsItemController } from './application/tagsItem.controller'
import { TagsItemRepository } from './domain/tagsItem.repository'
import { TagsItemService } from './domain/tagsItem.service'
import { TagsItemRepositoryImpl } from './infrastructure/tagsItem.repositoryImpl'
import { TagsItemModule } from './tagsItens.module'

describe('tagsItemModule', () => {
  test('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TagsItemModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(TagsItemController)).toBeInstanceOf(TagsItemController)
    expect(module.get(TagsItemService)).toBeInstanceOf(TagsItemService)
    expect(module.get(TagsItemRepository)).toBeInstanceOf(
      TagsItemRepositoryImpl,
    )
  })
})
