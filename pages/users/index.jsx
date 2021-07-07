import Head from 'next/head';
import styles from '../../styles/users.module.scss';
import { server } from '../../config';
import Link from 'next/link';
export default function Home({ users }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>User accounts</title>
			</Head>
			<div className={styles.heading}>Accounts</div>
			<div className={styles.users_list}>
				{users?.map((user, idx) => (
					<Link key={idx} href={`/users/${user.user_id}`}>
						<a>
							<div className={styles.user}>
								<p className={styles.name}>
									{user?.first_name}&nbsp;
									{user?.last_name}
								</p>
							</div>
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}
export async function getStaticProps(context) {
	console.log('All users', server, process.env.NODE_ENV);
	try {
		const res = await fetch(`${server}/api/users`);
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
