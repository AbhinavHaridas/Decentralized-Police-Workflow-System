import styles from './ViewEvidencesPage.module.css';
import {SingleEvidence} from "./SingleEvidence.jsx";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

function ViewEvidencesPage() {

    const location = useLocation();

    const firId = location.state.firId;

    console.log("FIR ID:", firId);
  
	const [jsonData, setJsonData] = useState(null);
	useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/evidence/allEvidences"
        );
        const json = await response.json();
        setJsonData(json);
        console.log(jsonData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<div className={styles.main}>
			<h1>Evidences</h1>
			<div className={styles.evidencesContainer}>
				{
					jsonData ? jsonData['data'].map((evidence,key)=> {
						return <SingleEvidence key={key} {...evidence} />
					}): null
				}
			</div>
		</div>
	)
}

export default ViewEvidencesPage;