// const Transaction = ({ receivers }) => {
// 	return <div>{JSON.stringify(receivers)}</div>;
// };

// export default Transaction;
// export async function getServerSideProps(context) {
// 	const { user_id } = context.query;
// 	try {
// 		const res = await fetch(
// 			`http://localhost:3000/api/transactions/${user_id}`
// 		);
// 		const json = await res.json();
// 		console.log(json.recievers);
// 		return {
// 			props: {
// 				receivers: json.recievers,
// 			},
// 		};
// 	} catch (error) {
// 		return {
// 			props: {
// 				error,
// 			},
// 		};
// 	}
// }
