module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [0],
    'subject-case': [0],
    'header-max-length': [2, 'always', 80],
  }
}
