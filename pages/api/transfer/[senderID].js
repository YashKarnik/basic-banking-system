import getData from '../../../getData';

// POST
export default async (req, res) => {
	const { senderID } = req.query;
	const { receiverID, value } = req.body;
	try {
		const query = `INSERT INTO transfers (senderID,receiverID,value) VALUES ('${senderID}','${receiverID}',${value})`;
		const results = await getData(query);
		const balance = await getData(
			`SELECT curr_balance from users WHERE user_id='${senderID}'`
		);
		res.status(200).json({ ...results, balance: balance[0] });
	} catch (error) {
		res.status(404).json({ error });
	}
};
