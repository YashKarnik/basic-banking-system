import React, { useState, useEffect } from 'react';
import styles from '../../styles/transfer.module.scss';

const Transfer = ({ user, rest }) => {
	const [receiverID, setReceiverID] = useState('');
	const [value, setValue] = useState('');
	const [currID, setCurrID] = useState(rest[0].user_id);

	async function handleSumbit(evt) {
		evt.preventDefault();
		if (currID == '') {
			alert('Please select a user');
			return;
		}
		if (value == 0) {
			alert('Enter valid number');
			return;
		}
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				receiverID: currID,
				value,
			}),
		};
		const res = await fetch(
			`http://localhost:3000/api/transfer/${user.user_id}`,
			options
		);
		const json = res.json();
		setReceiverID('');
		setValue('');
		console.log(json);
	}
	useEffect(() => {
		console.log(currID);
	}, [currID]);
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
			<div className={styles.users_list}>
				{rest?.map(user => (
					<div
						key={user.user_id}
						className={`${styles.user} ${
							user.user_id === currID ? styles.selected : styles.notselected
						}`}
						onClick={() => setCurrID(user.user_id)}>
						<p className={styles.name}>
							{user?.first_name}&nbsp;
							{user?.last_name}
						</p>
					</div>
				))}
			</div>
			<form className={styles.payform} onSubmit={handleSumbit}>
				<input
					type='number'
					onChange={e => setValue(e.target.value)}
					placeholder='Enter money to transfer'
					value={value}
					min='10'
				/>
				<button className={styles.payMoney} type='submit'>
					TRANSFER MONEY
				</button>
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
