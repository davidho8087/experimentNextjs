const commitLintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'header-max-length': [2, 'always', 100],
    'scope-enum': [2, 'always'],
    'body-max-length': [2, 'always', 300],
    'footer-max-line-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'sentence-case'],
  },
}

export default commitLintConfig
