const path =
	process.env.NODE_ENV == 'git-production' ? '/basic-banking-system' : '';
module.exports = {
	basePath: path,
	assetPrefix: path,
};
