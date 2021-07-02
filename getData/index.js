import connection from '../mysql.connect';

function getData(query) {
	return new Promise((resolve, reject) => {
		connection.query(query, (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
}

export default getData;
