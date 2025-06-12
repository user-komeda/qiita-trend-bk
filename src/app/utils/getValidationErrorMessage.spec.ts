import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, expect, test } from 'vitest'

import { CURRENT_VALIDATION_ERROR } from '../../const'
import { ItemsId } from '../form/itemsId/itemsId'

import {
  getErrorForCheckIsEmpty,
  getErrorForCheckLength,
  getErrorForCheckMather,
} from './getValidationErrorMessage'

const testCase1 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe(
    'itemsId must be longer than or equal to 20 characters',
  )
}
const testCase2 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: '',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckLength(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe('')
}
const testCase3 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, { itemsId: '' })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe('itemsId should not be empty')
}
const testCase4 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe('')
}
const testCase5 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'Cf465d271171cba8bd51',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe(
    'itemsId must match /^[0-9a-z]+$/ regular expression',
  )
}
const testCase6 = async (option: ValidationOptions): Promise<void> => {
  const itemsId: ItemsId = plainToInstance(ItemsId, {
    itemsId: 'cf465d271171cba8bd5',
  })
  const errors = await validate(itemsId, option)
  const errorMessage = getErrorForCheckMather(errors[CURRENT_VALIDATION_ERROR])
  expect(errorMessage).toBe('')
}

describe('getValidationErrorMessage', () => {
  const option: ValidatorOptions = {
    stopAtFirstError: true,
    forbidUnknownValues: false,
  }

  test('should complete get error message for check length', async () => {
    expect(testCase1(option)).toBeTruthy()
  })

  test('should complete get error message for check length different error', async () => {
    expect(testCase2(option)).toBeTruthy()
  })
  test('should complete get error message for check isEmpty', async () => {
    expect(testCase3(option)).toBeTruthy()
  })

  test('should complete get error message for check isEmpty different error', async () => {
    expect(testCase4(option)).toBeTruthy()
  })

  test('should complete get error message for check match', async () => {
    expect(testCase5(option)).toBeTruthy()
  })

  test('should complete get error message for check match different error', async () => {
    expect(testCase6(option)).toBeTruthy()
  })
})
