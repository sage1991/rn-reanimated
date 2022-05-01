module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "no-use-before-define": "off",
    "react/no-unused-prop-types": "warn",
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/destructuring-assignment": "off",
    "react/function-component-definition": "off",
    "react/no-array-index-key": "off",
    "react/style-prop-object": "off",
    "global-require": "off",
    "prettier/prettier": "error",
    "no-undef": "off",
    "react/jsx-props-no-spreading": "off",
    "lines-around-directive": "off",
    "import/no-extraneous-dependencies": "off",
    "react/require-default-props": "off"
  }
}
