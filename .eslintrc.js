module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
