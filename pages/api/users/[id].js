import getData from '../../../getData';
import corsMiddelware from '../../../config/cors';

export default async (req, res) => {
	await corsMiddelware(req, res);
	try {
		const { id } = req.query;
		const results = await getData(`SELECT * from users WHERE user_id='${id}'`);
		res.status(200).json({ results });
	} catch (error) {
		res.status(404).json({ error });
	}
};
