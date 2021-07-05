import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/users.module.scss';
import Loading from '../../components/loading';
import { baseUri } from '../../next.config';
// import Head from 'next/head';
export default function Home({ users }) {
	const [loading, setLoading] = useState(true);
	const Router = useRouter();
	useEffect(() => {
		const start = () => {
			console.log('start');
			setLoading(true);
		};
		const end = () => {
			console.log('findished');
			setLoading(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, [Router]);
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
	console.log(`${baseUri}${host}/api/users`);
	console.log({ baseUri, host });
	try {
		const res = await fetch(`${baseUri}${host}/api/users`);
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
