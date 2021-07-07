import Cors from 'cors';

// Initializing the cors middleware

const whitelist = [
	new RegExp('http://localhost:*'),
	new RegExp('https://banking-system-*.vercel.app*'),
];
const corsOptions = {
	origin: whitelist,
	methods: ['GET', 'POST'],
};

const cors = Cors();

function runCorsMiddleware(req, res) {
	return new Promise((resolve, reject) => {
		cors(req, res, result => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
export default runCorsMiddleware;
