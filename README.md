
## 项目构建
### init
```sh
npm init -y
git init
```

### eslint & prettier

```sh
npm install -D eslint eslint-plugin-vue babel-eslint #Vue
npm install -D --save-exact prettier
npm install -D eslint-plugin-prettier eslint-config-prettier
```

### husky & lint-staged
```sh
npx mrm@2 lint-staged
```

### eslint模块识别错误

> require() of ES modules is not supported.

```sh
npm un babel-eslint
npm install eslint @babel/core @babel/eslint-parser --save-dev
```
```js
module.exports = {
  parser: "@babel/eslint-parser",
  requireConfigFile: false,
};
```

[ESlint - Error: Must use import to load ES Module](https://stackoverflow.com/questions/69554485/eslint-error-must-use-import-to-load-es-module)

