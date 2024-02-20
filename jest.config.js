module.exports = {
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts)?$": "ts-jest",
	},
	testPathIgnorePatterns: ["/node_modules/", "/out/"],
};
