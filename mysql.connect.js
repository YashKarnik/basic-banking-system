const mysql = require('mysql');
const connection = mysql.createConnection({
	host: process.env.AWS_RDS_DB_HOST,
	user: process.env.AWS_RDS_DB_USER,
	password: process.env.AWS_RDS_DB_PASSWORD,
	database: process.env.AWS_RDS_DB_DEFAULT_DATABASE,
});

connection.connect(err => {
	if (err) console.log(err);
	else console.log('Connection established');
});

export default connection;
