import React, { useState } from 'react';

const Transfer = ({ user, rest }) => {
	const [receiverID, setReceiverID] = useState('');
	const [value, setValue] = useState(0);
	async function handleSumbit(evt) {
		evt.preventDefault();
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				receiverID,
				value,
			}),
		};
		const res = await fetch(
			`http://localhost:3000/api/transfer/${user.user_id}`,
			options
		);
		const json = res.json();
		console.log(json);
	}

	return (
		<div>
			<h1>USER</h1>
			{JSON.stringify(user)}
			<h1>REST</h1>
			{JSON.stringify(rest)}
			<h1>FORM</h1>
			<form onSubmit={handleSumbit}>
				<h3>
					SENDER:{user.first_name} {user.last_name}
				</h3>
				<h3>
					receiver:
					<input
						type='text'
						placeholder='Enter receiver'
						onChange={e => setReceiverID(e.target.value)}
					/>
					<input
						type='number'
						min='50'
						placeholder='Enter value'
						onChange={e => setValue(parseInt(e.target.value))}
					/>
				</h3>
				<button type='submit'>PAY</button>
			</form>
		</div>
	);
};

export default Transfer;
export async function getServerSideProps(context) {
	const { senderID } = context.query;
	try {
		const res = await fetch(`http://localhost:3000/api/users`);
		const json = await res.json();
		const user = json.results.filter(
			element => element.user_id === senderID
		)[0];
		const rest = json.results.filter(element => element.user_id !== senderID);
		return {
			props: {
				user,
				rest,
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
