module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ["**/dist/*", "node_modules/*"],
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
};
