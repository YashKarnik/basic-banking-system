import Head from 'next/head';

export default function Home({ users }) {
	return <div>{JSON.stringify(users)}</div>;
}
export async function getServerSideProps(context) {
	try {
		const res = await fetch('http://localhost:3000/api/users');
		const json = await res.json();
		return {
			props: {
				users: json.results,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}
