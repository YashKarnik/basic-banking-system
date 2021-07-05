const BASE_API_URI =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:3001'
		: 'https://banking-system-ne4mn7884-yashkarnik.vercel.app';
module.exports = {
	env: {
		BASE_API_URI: BASE_API_URI,
	},
};
