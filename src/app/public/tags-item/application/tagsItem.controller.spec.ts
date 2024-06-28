import { Test, TestingModule } from '@nestjs/testing'

import { TagsItemController } from './tagsItem.controller'

describe('TagsItemController', () => {
  let controller: TagsItemController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsItemController],
    }).compile()

    controller = module.get<TagsItemController>(TagsItemController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
