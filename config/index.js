// export const server = dev
// 	? 'http://localhost:3001'
// 	: 'https://banking-system-pi.vercel.app';

// let server;
// if (process.env.NODE_ENV == 'git-production')
// 	server = 'https://yashkarnik.github.io/basic-banking-system/';
// else {
// 	if (process.env.NODE_ENV != 'production') server = 'http://localhost:3001';
// 	else server = 'https://banking-system-pi.vercel.app';
// }
// console.log(server);
// export { server };
const expression = process.env.NODE_ENV;
let server;
switch (expression) {
	case 'git-production':
		server = 'https://yashkarnik.github.io/basic-banking-system';
		break;
	case 'production':
		server = 'https://banking-system-pi.vercel.app';
		break;
	default:
		server = 'http://localhost:3001';
}
export { server };
