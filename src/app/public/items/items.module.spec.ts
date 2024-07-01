import { HttpService } from '@nestjs/axios'
import { Test } from '@nestjs/testing'

import { ItemsController } from './application/items.controller'
import { ItemsRepository } from './domain/items.repository'
import { ItemsService } from './domain/items.service'
import { ItemsRepositoryImpl } from './infrastructure/items.repositoryImpl'
import { ItemsModule } from './items.module'

describe('itemsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ItemsModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(HttpService)).toBeInstanceOf(HttpService)
    expect(module.get(ItemsController)).toBeInstanceOf(ItemsController)
    expect(module.get(ItemsService)).toBeInstanceOf(ItemsService)
    expect(module.get(ItemsRepository)).toBeInstanceOf(ItemsRepositoryImpl)
  })
})
