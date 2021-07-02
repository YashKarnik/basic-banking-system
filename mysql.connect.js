const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'basic-banking-system',
});

connection.connect(err => {
	if (err) console.log(err);
	else console.log('Connection established');
});

export default connection;
