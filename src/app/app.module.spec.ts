import { Test } from '@nestjs/testing'

import { AdminModule } from './admin/admin.module'
import { AppModule } from './app.module'
import { PublicModule } from './public/public.module'

describe('appModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(PublicModule)).toBeInstanceOf(PublicModule)
    expect(module.get(AdminModule)).toBeInstanceOf(AdminModule)
  })
})
