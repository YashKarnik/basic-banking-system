import React, { useState, useEffect } from 'react';
import styles from '../../styles/transfer.module.scss';
import Head from 'next/head';
import { server } from '../../config';
const Transfer = ({ user, rest }) => {
	const [receiverID, setReceiverID] = useState('');
	const [value, setValue] = useState('');
	const [currID, setCurrID] = useState(rest[0].user_id);
	const [success, setSuccess] = useState(0);
	const [loading, setLoading] = useState(false);
	async function handleSumbit(evt) {
		evt.preventDefault();
		if (currID == '') {
			alert('Please select a user');
			return;
		}
		if (value <= 0) {
			alert('Enter valid number. Number must be >=0');
			return;
		}
		if (value > user.curr_balance) {
			alert('Insufficient balance');
			return;
		}
		setLoading(true);
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
		const res = await fetch(`${server}/api/transfer/${user?.user_id}`, options);
		const json = await res.json();
		console.log(json, res);
		if (res.ok) {
			setReceiverID('');
			setValue('');
			setSuccess(1);
		} else setSuccess(2);
		setLoading(false);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>
					Transfer | {user.first_name}&nbsp;{user.last_name}
				</title>
			</Head>
			<div className={styles.user}>
				<div className={styles.name}>
					{user.first_name}&nbsp;{user.last_name}
				</div>
				<div className={styles.email}>{user.email}</div>
				<div className={styles.curr_balance}>
					Balance: ${user.curr_balance}/-
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
				<form className={styles.payform} onSubmit={handleSumbit}>
					<input
						type='number'
						onChange={e => setValue(e.target.value)}
						placeholder='Enter money to transfer'
						value={value}
						min='10'
					/>
					<button className={styles.payMoney} type='submit'>
						{loading ? 'LOADING...' : 'TRANSFER'}
					</button>
				</form>
				{(function (flag) {
					if (flag == 1)
						return (
							<div className={styles.transfer_success}>
								TRANSACTION SUCCESSFUL!!
								<div onClick={() => setSuccess(0)}>&times;</div>
							</div>
						);
					else if (flag == 2)
						return (
							<div className={styles.transfer_fail}>
								TRANSACTION FAILED!!
								<div onClick={() => setSuccess(0)}>&times;</div>
							</div>
						);
				})(success)}
			</div>
		</div>
	);
};

export default Transfer;
export async function getServerSideProps(context) {
	const { senderID } = context.query;

	console.log('Transfers', server, process.env.NODE_ENV);
	try {
		const res = await fetch(`${server}/api/users`);
		const json = await res.json();
		if (json?.error) throw json.error;
		const user = json.results.filter(element => element.user_id == senderID)[0];
		const rest = json.results.filter(element => element.user_id != senderID);

		return {
			props: {
				user,
				rest,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}
