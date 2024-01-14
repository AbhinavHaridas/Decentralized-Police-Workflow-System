import styles from './ViewEvidencesPage.module.css';
import { SingleEvidence } from "./SingleEvidence.jsx";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

function ViewEvidencesPage() {

    const location = useLocation();
    
    const firId = location?.state?.fir_id ? location?.state?.fir_id : 1;
    const requestingId = location?.state?.department_id ? location?.state?.department_id : 1;
    const ownerId = requestingId === 1 ? 3 : 1;

    console.log("FIR ID:", firId);
  console.log("Requesting ID:", requestingId);

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
    <div>
      <h1 className="pt-6 text-2xl font-bold mb-4 text-blue-700 text-center">
        <FontAwesomeIcon icon={faFingerprint} className="mr-2" />
        View Evidence
      </h1>

      {/* <div className="h-screen flex flex-col items-center justify-center"></div> */}

      <div className={styles.evidencesContainer}>
      {
        jsonData ? jsonData['data'].map((evidence,key)=> {
        return <SingleEvidence key={key} evidence={evidence} ownerId={ownerId} requestingId={requestingId} />
        }): null
      }
      </div>
    </div>
  );
  
	// return (
	// 	<div className={styles.main}>
	// 		<h1 className={styles.heading}>Evidences</h1>
	// 		<div className={styles.evidencesContainer}>
	// 			{
	// 				jsonData ? jsonData['data'].map((evidence,key)=> {
	// 					return <SingleEvidence key={key} evidence={evidence} ownerId={ownerId} requestingId={requestingId} />
	// 				}): null
	// 			}
	// 		</div>
	// 	</div>
	// )
}

export default ViewEvidencesPage;