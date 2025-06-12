import { Test } from '@nestjs/testing'
import { describe, test, expect } from 'vitest'

import { AdminModule } from './admin.module'

describe('adminModule', () => {
  test('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile()

    expect(module).toBeDefined()
  })
})
