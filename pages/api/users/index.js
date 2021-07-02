import getData from '../../../getData';

export default async (req, res) => {
	try {
		const results = await getData('SELECT * from users');
		res.status(200).json({ results });
	} catch (error) {
		res.status(404).json({ error });
	}
};
