module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	ignorePatterns: ["out", "dbErrorHandler.ts", ".eslintrc.js", "jest.config.js", "db.create.ts"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
