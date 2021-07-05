import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/users.module.scss';
import Loading from '../../components/loading';
export default function Home({ users }) {
	const [loading, setLoading] = useState(true);

	return (
		<div className={styles.container}>
			<Head>
				<title>User accounts</title>
			</Head>
			<div className={styles.heading}>Accounts</div>
			<div className={styles.users_list}>
				{users?.map((user, idx) => (
					<a key={idx} href={`users/${user.user_id}`}>
						<div className={styles.user}>
							<p className={styles.name}>
								{user?.first_name}&nbsp;
								{user?.last_name}
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
export async function getServerSideProps(context) {
	const host = context.req.headers.host;
	// const router = useRouter();
	// const { basePath } = router;
	const basePath = process.env.BASE_API_URI;
	console.log(basePath);
	try {
		const res = await fetch(`${basePath}/api/users`);
		const json = await res.json();
		if (json?.error) throw json.error;
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
