const BASE_API_URI =
	process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : '';
module.exports = {
	baseUri: BASE_API_URI,
};
