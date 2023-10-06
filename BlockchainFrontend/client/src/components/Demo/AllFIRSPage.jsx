import styles from './AllFIRSPage.module.css';
import {SingleFIR} from './singleFIR.jsx';
import {useEffect, useState} from "react";

function AllFIRSPage() {
	const [jsonData, setJsonData] = useState(null);

	useEffect(() => {
		const fetchAPI = async () => {
			const response = await fetch('http://localhost:8000/fir/viewFirs?officer_id=1');
			const json = await response.json();
			setJsonData(json);
		}

		fetchAPI();
	}, []);

	return (
		<div className={styles.main}>
			<h1>FIRS for officer 1</h1>
			{
				jsonData? jsonData['data'].map((FIR) => {
					return <SingleFIR {...FIR} />
				}): null
			}
		</div>
	)
}

export default AllFIRSPage;