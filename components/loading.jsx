import React from 'react';
import styles from '../styles/loading.module.scss';

const Loading = ({ isFull }) => {
	return (
		<div
			className={`${styles.container} ${
				isFull ? styles.full : styles.component
			}`}>
			<div></div>
		</div>
	);
};

export default Loading;
