const expression = process.env.NODE_ENV;
let server;
switch (expression) {
	case 'production':
		server = 'https://yashkarnik.github.io/basic-banking-system';
		break;
	case 'development':
		server = 'http://localhost:3001';
		break;
	default:
		server = 'http://localhost:3001';
		break;
}
export { server };
