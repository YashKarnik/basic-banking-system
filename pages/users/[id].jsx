import React from 'react';
import styles from '../../styles/user.module.scss';

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
			<div className={styles.user}>
				<div className={styles.name}>
					{user.first_name}&nbsp;{user.last_name}
				</div>
				<div className={styles.email}>{user.email}</div>
				<div className={styles.curr_balance}>
					Current balance: {user.curr_balance}/-
				</div>
			</div>

			<div className={styles.transactions}>
				<div className={`${styles.transaction} ${styles.receiver}`}>
					<p>From: Central Bank</p>
					<p>
						To: {user.first_name} {user.last_name}
					</p>
					<p>Thu, Jul 1, 2021</p>
					<p>VALUE: 100000</p>
				</div>
				{transactions?.map(transaction => (
					<div
						className={`${styles.transaction} ${
							user.user_id !== transaction.senderID
								? styles.receiver
								: styles.sender
						}`}
						key={transaction.transactionID}>
						<p>
							From: {transaction.senderfirstName} {transaction.senderlastName}
						</p>
						<p>
							To: {transaction.receiverfirstName} {transaction.receiverlastName}
						</p>
						<p>{get_date(transaction.time)}</p>
						<p>
							VALUE: {user.user_id == transaction.senderID ? '-' : '+'}
							{transaction.value}
						</p>
					</div>
				))}
			</div>
			<button className={styles.payMoney}>
				<a href={`/transfer/${user?.user_id}`}>SEND MONEY</a>
			</button>
		</div>
	);
};
export default User;

export async function getServerSideProps(context) {
	const { id } = context.query;
	try {
		const res = await fetch(`http://localhost:3001/api/users/${id}`);
		const json = await res.json();
		const transactions = await fetch(
			`http://localhost:3001/api/transactions/${id}`
		);
		if (transactions) {
			const transactionsJson = await transactions.json();
			return {
				props: {
					user: json?.results[0],
					transactions: transactionsJson.recievers,
				},
			};
		} else console.log(transactions);
	} catch (error) {
		return {
			props: {
				error: 'err',
			},
		};
	}
}
