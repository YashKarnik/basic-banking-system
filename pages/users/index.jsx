import Head from 'next/head';

import styles from '../../styles/users.module.scss';

export default function Home({ users }) {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Users</h1>
			<div className={styles.users_list}>
				{users?.map(user => (
					<a href={`users/${user.user_id}`}>
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
