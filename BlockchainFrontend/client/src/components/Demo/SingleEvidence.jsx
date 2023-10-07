import styles from './SingleEvidence.module.css';

export function SingleEvidence(props) {
	return props['fir_id'] === 2 ? (
		<div className={styles.mainNotAllowed}>
			<p>fir_id: <b>{props['fir_id']}</b></p>
			<p>evidence: <b>{props['evidence']}</b></p>
		</div>
	): (
		<a href={`https://gateway.pinata.cloud/ipfs/${props['evidence']}`}>
			<div className={styles.main}>
				<p>fir_id: <b>{props['fir_id']}</b></p>
				<p>evidence: <b>{props['evidence']}</b></p>
			</div>
		</a>
	);
}