module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'semi': ['warn', 'never'],
    'no-console': 'warn',
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 2,
      'multiline': 1
    }],
    'indent': ['warn', 2],
    'quotes': ['warn', 'single', {
      'allowTemplateLiterals': true
    }],
    'comma-dangle': ['error', 'never'],
    'vue/comma-dangle': ['error', 'never'],
    'comma-style': ['warn', 'last'],
    'brace-style': ['warn', '1tbs', {
      'allowSingleLine': true
    }],
    'vue/brace-style': ['warn', '1tbs', {
      'allowSingleLine': true
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': true,
      'ignores': []
    }],
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }],
    'array-bracket-spacing': ['warn', 'never'],
    'vue/array-bracket-spacing': ['warn', 'never'],
    'arrow-spacing': ['warn'],
    'vue/arrow-spacing': ['warn'],
    'block-spacing': ['warn', 'always'],
    'vue/block-spacing': ['warn', 'always'],
    'vue/no-dupe-keys': ['error', {
      'groups': []
    }],
    'key-spacing': ['warn'],
    'vue/key-spacing': ['warn'],
    'keyword-spacing': ['warn'],
    'vue/keyword-spacing': ['warn'],
    'eqeqeq': ['error', 'smart'],
    'vue/eqeqeq': ['error', 'smart'],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/require-default-prop': ['off'],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false
    }],
    'no-irregular-whitespace': ['error'],
    'vue/no-irregular-whitespace': ['error'],
    'object-curly-spacing': ['warn', 'always'],
    'vue/object-curly-spacing': ['warn', 'always'],
    'vue/require-direct-export': ['error'],
    'vue/require-name-property': ['error'],
    'vue/space-infix-ops': ['warn'],
    'space-infix-ops': ['warn'],
    'vue/v-on-function-call': ['warn']
  }
}