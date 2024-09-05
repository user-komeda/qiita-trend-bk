import { Test } from '@nestjs/testing'

import { AdminModule } from './admin.module'

describe('adminModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile()

    expect(module).toBeDefined()
  })
})
