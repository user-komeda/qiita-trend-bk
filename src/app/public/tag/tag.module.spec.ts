import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { describe, expect, test } from 'vitest'

import { TagController } from './application/tag.controller'
import { TagRepository } from './domain/tag.repository'
import { TagService } from './domain/tag.service'
import { TagRepositoryImpl } from './infrastructure/tag.repositoryImpl'
import { TagModule } from './tag.module'

describe('tagModule', () => {
  test('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TagModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(TagController)).toBeInstanceOf(TagController)
    expect(module.get(TagService)).toBeInstanceOf(TagService)
    expect(module.get(TagRepository)).toBeInstanceOf(TagRepositoryImpl)
  })
})
