import getData from '../../../getData';

export default async (req, res) => {
	const { user_id } = req.query;
	try {
		const query = `SELECT users.first_name,users.last_name,users.email,transfers.time,transfers.value FROM transfers 
		JOIN users
	    ON users.user_id=transfers.receiverID
		WHERE transfers.senderID='${user_id}'`;
		const recievers = await getData(query);
		res.status(200).json({ recievers });
	} catch (error) {
		res.status(404).json({ error });
	}
};
