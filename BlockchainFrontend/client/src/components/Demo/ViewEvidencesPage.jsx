import styles from './ViewEvidencesPage.module.css';
import {SingleEvidence} from "./SingleEvidence.jsx";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

function ViewEvidencesPage() {

    const location = useLocation();
    const ownerId = 4;

    const firId = location?.state?.firId ? location?.state?.firId : 1;
    const requestingId = location?.state?.departmentId ? location?.state?.departmentId : 1;

    // console.log("FIR ID:", firId);
  
	const [jsonData, setJsonData] = useState(null);
	useEffect(() => {
    const fetchApi = async () => {
      try {
        const reqObj = {
          fir_id: firId,
          dept_id: requestingId
        }

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(reqObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        };

        fetch(
          "http://localhost:8000/evidence/viewCaseEvidence", requestOptions
        ).then((response) => response.json())
          .then((result) => {
            console.log(result);
            setJsonData(result);
          });
        
      } catch (e) {
        console.error(e);
      }
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<div className={styles.main}>
			<h1 className={styles.heading}>Evidences</h1>
			<div className={styles.evidencesContainer}>
				{
					jsonData ? jsonData['data'].map((evidence,key)=> {
						return <SingleEvidence key={key} evidence={evidence} ownerId={ownerId} requestingId={requestingId} />
					}): null
				}
			</div>
		</div>
	)
}

export default ViewEvidencesPage;