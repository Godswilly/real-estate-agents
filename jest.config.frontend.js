module.exports = {
	displayName: 'frontend',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['/node_modules/', '/server/'],
	coveragePathIgnorePatterns: ['/node_modules/', '/server/'],
	moduleNameMapper: {
		'\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};
