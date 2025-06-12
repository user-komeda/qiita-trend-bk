import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToInstance } from 'class-transformer'
import { ValidationOptions, validate } from 'class-validator'
import { describe, test, expect } from 'vitest'

import { CURRENT_VALIDATION_ERROR, ZERO } from '../../../const'
import { getErrorForCheckIsEmpty } from '../../utils/getValidationErrorMessage'

import { TagId } from './tagId'

const testCase1 = async (option: ValidationOptions): Promise<void> => {
  const tagId: TagId = plainToInstance(TagId, {
    tagId: 'wifi',
  })

  const errors = await validate(tagId, option)
  expect(errors).toHaveLength(ZERO)
}
const testCase2 = async (option: ValidationOptions): Promise<void> => {
  const tagId: TagId = plainToInstance(TagId, {
    tagId: '',
  })

  const errors = await validate(tagId, option)

  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )
}
const testCase3 = async (option: ValidationOptions): Promise<void> => {
  const tagId: TagId = plainToInstance(TagId, {
    tagId: null,
  })

  const errors = await validate(tagId, option)
  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )
}
const testCase4 = async (option: ValidationOptions): Promise<void> => {
  const tagId = plainToInstance(TagId, {
    tagId: undefined,
  })
  const errors = await validate(tagId, option)
  expect(errors).not.toHaveLength(ZERO)
  expect(getErrorForCheckIsEmpty(errors[CURRENT_VALIDATION_ERROR])).toBe(
    'tagId should not be empty',
  )
}

describe('tagIdValidation', () => {
  const option: ValidatorOptions = {
    stopAtFirstError: true,
    forbidUnknownValues: false,
  }
  test('should complete validation', async () => {
    expect(testCase1(option)).toBeTruthy()
  })

  test('should throw error when itemsId is empty', async () => {
    expect(testCase2(option)).toBeTruthy()
  })

  test('should throw error when itemsId is null', async () => {
    expect(testCase3(option)).toBeTruthy()
  })

  test('should throw error when itemsId is undefined', async () => {
    expect(testCase4(option)).toBeTruthy()
  })
})
