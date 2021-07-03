import React from 'react';
import styles from '../../styles/user.module.scss';

const User = ({ user, transactions }) => {
	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<div className={styles.name}>
					{user.first_name}&nbsp;{user.last_name}
				</div>
				<div className={styles.email}>{user.email}</div>
				<div className={styles.curr_balance}>
					Balance: {user.curr_balance}/-
				</div>
			</div>
			{/* {JSON.stringify(transactions)} */}
			<div className={styles.transactions}>
				{transactions?.map(transaction => (
					<div
						className={`${styles.transaction} ${
							user.user_id !== transaction.senderID
								? styles.receiver
								: styles.sender
						}`}
						key={transaction.transactionID}>
						<p>
							From: {transaction.senderfirstName}
							{transaction.senderlastName}
						</p>
						<p>
							To: {transaction.receiverfirstName}
							{transaction.receiverlastName}
						</p>
						<p>{transaction.time.substr(0, 16)}</p>
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
		const res = await fetch(`http://localhost:3000/api/users/${id}`);
		const json = await res.json();
		const transactions = await fetch(
			`http://localhost:3000/api/transactions/${id}`
		);
		const transactionsJson = await transactions.json();
		return {
			props: {
				user: json?.results[0],
				transactions: transactionsJson.recievers,
			},
		};
	} catch (error) {
		return {
			props: {
				error: 'err',
			},
		};
	}
}
