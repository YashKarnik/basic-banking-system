import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../styles/users.module.scss';
import Loading from '../../components/loading';

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
			<h1 className={styles.heading}>Users</h1>
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
	try {
		const res = await fetch('http://localhost:3001/api/users');
		const json = await res.json();
		console.log(json);
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
