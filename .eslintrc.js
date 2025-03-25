module.exports = {
  extends: ["expo", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        tabWidth: 2,
        useTabs: false,
        arrowParens: "always",
        printWidth: 120,
        semi: false,
        singleQuote: false,
        bracketSpacing: true,
        endOfLine: "auto"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
