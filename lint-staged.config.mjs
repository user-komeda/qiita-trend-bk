import { ESLint } from 'eslint'

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

export default {
  '*.{ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [
      // TODO: test作成
      // 'yarn test:cov',
      `yarn lint --max-warnings=0 ${filesToLint}`,
      'yarn format',
    ]
  },
}
