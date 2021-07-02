import getData from '../../../getData';

export default async (req, res) => {
	const { id } = req.query;

	try {
		const results = await getData(`SELECT * from users WHERE user_id='${id}'`);
		res.status(200).json({ results });
	} catch (error) {
		res.status(404).json({ error });
	}
};
