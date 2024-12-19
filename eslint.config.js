import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/**/*.ts', '**/*.js', 'packages/**/*.ts', 'packages/**/*.tsx'],
    extends: [
      tseslint.configs.base,
    ],
    rules: {
      // // 不允许重名参数
      "no-dupe-args": "error",

      // // 强制使用一致的缩进 tab
      // indent: ["warn", "tab", { VariableDeclarator: 2 }],

      // 必须使用单引号
      quotes: ["error", "single"],

      // // 强制分号之前和之后使用一致的空格
      "semi-spacing": ["error", { before: false, after: true }],

      // // 强制在逗号后面使用空格,前面不能空格
      "comma-spacing": ["error", { before: false, after: true }],

      // // 强制分号出现在句子末尾
      "semi-style": ["error", "last"],

      // // 强制所有控制语句使用一致的括号风格
      'curly': ['error', 'all'],

      // // 禁止使用多个空格
      "no-multi-spaces": ["error"],

      // // 强制在代码块中开括号前和闭括号后有空格
      "block-spacing": ["error", "always"],

      // // 大括号风格要求
      "brace-style": ["error", "1tbs"],

      // // 禁止在函数名和()之间有空格
      "func-call-spacing": ["error", "never"],

      // 多行注释使用特定风格,禁止使用连续的行注释来表示块注释。另外，要求块注释的每行之前有一个 *
      "multiline-comment-style": ["error", "separate-lines"],

      // // 必须函数圆括号之前有一个空格
      // "space-before-function-paren": ["error", "always"],

      // // 构造函数 必须首字母大写
      "new-cap": ["error"],

      // // 禁用按位运算符
      // "no-bitwise": ["error"],

      // // 最大 换行2；开头 结尾 3
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 3, maxBOF: 3 }],

      // /*  禁止属性前有空白 */
      "no-whitespace-before-property": ["error"],

      // // 要求箭头函数体使用大括号
      // "arrow-body-style": ["error", "always"],

      // // 要求箭头函数的参数使用圆括号
      "arrow-parens": ["error", "always"],

      // // 要求箭头函数的箭头之前或之后有空格
      "arrow-spacing": ["error", { before: true, after: true }],

      "no-var": ["error"],
      "no-debugger": ["warn"],
      // "no-unused-vars": ["error"],

      "no-void": ["error"],
      "no-alert": ["error"],
    },
  },
  {
    ignores: [
      '**/dist/',
      '**/temp/',
      '**/coverage/',
      '.idea/',
      'explorations/',
      'dts-build/packages',
      'eslint.config.js'
    ],
  }
);
