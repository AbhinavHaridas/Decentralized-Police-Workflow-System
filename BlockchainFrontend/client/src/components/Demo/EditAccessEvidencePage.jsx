import styles from './EditAccessEvidencePage.module.css'
import {useState} from "react";

export function EditAccessEvidencePage() {
	const [dept, setDept] = useState(null);
	const [evidenceId, setEvidenceId] = useState(null);

	const addDept = (dept_id) => {
		if (!dept) setDept([dept_id]);
		else setDept([...dept, dept_id]);
	}

	const removeDept = (dept_id) => {
		const tmp = dept.filter(item => item !== dept_id);
		setDept(tmp);
	}

	const handleCheck = (event, dept_id) => {
		const isNotChecked = event.target.checked;

		if (isNotChecked) {
			addDept(dept_id);
		} else {
			removeDept(dept_id);
		}
	}

	const sendAccess = async () => {
		if (!dept && !evidenceId) alert('Please enter departments or evidence');

		try {
			await fetch('http://localhost:8000/evidence/addEvidenceAccess', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					evidence_id: evidenceId,
					department_ids: dept
				})
			});

			alert('Access send successfully');
		} catch (e) {
			console.error(e);
		}

	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<h1>Share Evidence</h1>
				<h3>Enter evidence_id:</h3>
				<input type='number' onChange={(e) => setEvidenceId(e.target.value)}/>
				<div className={styles.checkBoxes}>
					<input type='checkbox' onChange={(e) => handleCheck(e, 1)} />
					<h3>Dept 1</h3>

					<input type='checkbox' onChange={(e) => handleCheck(e, 2)}/>
					<h3>Dept 2</h3>
				</div>

				<div className={styles.checkBoxes}>
					<input type='checkbox' onChange={(e) => handleCheck(e, 3)}/>
					<h3>Dept 3</h3>

					<input type='checkbox' onChange={(e) => handleCheck(e, 4)}/>
					<h3>Dept 4</h3>
				</div>

				<button type='button' className={styles.submit} onClick={sendAccess}>
					submit
				</button>
			</div>
		</div>
	)
}