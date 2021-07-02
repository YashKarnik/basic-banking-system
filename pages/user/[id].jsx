import React from 'react';

const User = ({ user, transactions }) => {
	return (
		<div>
			{JSON.stringify(user)}
			<button>
				<a href={`/transfer/${user?.user_id}`}>SEND MONEY</a>
			</button>
			<h3>Transacton</h3>
			{JSON.stringify(transactions)}
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
				error,
			},
		};
	}
}
