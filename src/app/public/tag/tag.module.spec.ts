import { Test } from '@nestjs/testing'
import { TagModule } from './tag.module'
import { TagController } from './application/tag.controller'
import { TagService } from './domain/tag.service'
import { TagRepository } from './domain/tag.repository'
import { TagRepositoryImpl } from './infrastructure/tag.repositoryImpl'
import { HttpService } from '@nestjs/axios'

describe('tagModule', () => {
  it('should compile the module', async () => {
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
