import getData from '../../../getData';

async function helper(e) {
	try {
		const { senderID, receiverID } = e;
		let query = `SELECT * FROM users WHERE user_id='${senderID}'`;

		const sender = await getData(query);
		query = `SELECT * FROM users WHERE user_id='${receiverID}'`;
		const receiver = await getData(query);

		return {
			...e,
			senderfirstName: sender[0].first_name,
			senderlastName: sender[0].last_name,
			senderemail: sender[0].email,
			receiverfirstName: receiver[0].first_name,
			receiverlastName: receiver[0].last_name,
			receiveremail: receiver[0].email,
		};
	} catch (error) {
		throw error;
	}
}

export default async (req, res) => {
	const { user_id } = req.query;
	try {
		const query = `SELECT * FROM transfers WHERE senderID='${user_id}' 
		UNION
		SELECT * FROM transfers WHERE receiverID='${user_id}'
		ORDER BY time`;

		const recievers = await getData(query);
		const promises = recievers.map(helper);

		const updatedRecivers = await Promise.all(promises);

		res.status(200).json({ recievers: updatedRecivers });
	} catch (error) {
		res.status(404).json({ error });
	}
};
