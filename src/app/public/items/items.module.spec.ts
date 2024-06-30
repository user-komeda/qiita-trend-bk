import { Test } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { ItemsModule } from './items.module'
import { ItemsController } from './application/items.controller'
import { ItemsService } from './domain/items.service'
import { ItemsRepositoryImpl } from './infrastructure/items.repositoryImpl'
import { ItemsRepository } from './domain/items.repository'

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
