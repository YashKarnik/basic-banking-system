const BASE_API_URI =
	process.env.NODE_ENV == 'development' ? 'http://' : 'https://';
module.exports = {
	baseUri: BASE_API_URI,
};
