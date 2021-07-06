import styles from '../../styles/user.module.scss';
import Head from 'next/head';
import { server } from '../../config';
const User = ({ user, transactions }) => {
	function get_date(datetime) {
		let date = datetime.substring(0, 10);
		let time = datetime.substring(12);
		const [yyyy, mm, dd] = date.split('-');
		date = new Date(yyyy, mm - 1, dd);
		const options = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		let ampm = '';

		return date.toLocaleDateString('en-US', options);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>
					Account | {user.first_name}&nbsp;{user.last_name}
				</title>
			</Head>
			<div className={styles.user}>
				<div className={styles.name}>
					{user.first_name}&nbsp;{user.last_name}
				</div>
				<div className={styles.email}>{user.email}</div>
				<div className={styles.curr_balance}>
					Current balance: ${user.curr_balance}/-
				</div>
			</div>

			<div className={styles.transactions}>
				<div className={`${styles.transaction} ${styles.receiver}`}>
					<p>From: Bank</p>
					<p>
						To: {user.first_name} {user.last_name}
					</p>
					<p>Thu, Jul 1, 2021</p>
					<p>VALUE: $100000/-</p>
				</div>
				{transactions?.map((transaction, i) => (
					<div
						className={`${styles.transaction} ${
							user.user_id !== transaction.senderID
								? styles.receiver
								: styles.sender
						}`}
						key={i}>
						<p>
							From: {transaction.senderfirstName} {transaction.senderlastName}
						</p>
						<p>
							To: {transaction.receiverfirstName} {transaction.receiverlastName}
						</p>
						<p>{get_date(transaction.time)}</p>
						<p>
							VALUE: {user.user_id == transaction.senderID ? '-' : '+'}$
							{transaction.value}/-
						</p>
					</div>
				))}
			</div>
			<a href={`/transfer/${user?.user_id}`} className={styles.payMoney}>
				<button>SEND MONEY</button>
			</a>
		</div>
	);
};
export default User;

export async function getServerSideProps(context) {
	const { id } = context.query;
	console.log('users with ID', id, server, process.env.NODE_ENV);
	try {
		const res = await fetch(`${server}/api/users/${id}`);
		const transactions = await fetch(`${server}/api/transactions/${id}`);

		const json = await res.json();
		const transactionsJson = await transactions.json();
		if (json?.error || transactionsJson?.error)
			throw json?.error || transactionsJson?.error;
		return {
			props: {
				user: json?.results[0],
				transactions: transactionsJson.recievers,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true,
		};
	}
}
