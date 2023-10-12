import styles from "./ViewStatusPage.module.css";
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const statusObj = {
  0: "Pending",
  1: "Approved",
  "-1": "Rejected",
};

function ViewStatusPage() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [transactionID, setTransactionID] = useState("");
  const [jsonData, setJsonData] = useState(null);

  const callFIR = async () => {
    if (transactionID === "") {
      alert("Please enter transaction ID");
      return;
    }

    try {
      const result = await contract.methods
        .FIRList(transactionID)
        .call({ from: accounts[0] });
      console.log(result);
		console.log(result.status);
		if (result.transactionId === "") {
			alert("No FIR found with this transaction ID");
			return;
		}
      setJsonData(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>View FIR</h1>

      <div className={styles.inputDiv}>
        <input
          type="text"
          className={styles.inputField}
          onChange={(e) => setTransactionID(e.target.value)}
        ></input>
        <button className={styles.inputButton} onClick={callFIR}>
          Search
        </button>
      </div>

      {jsonData ? (
        <div className={styles.FIR}>
          {/* <p>id: {element["id"]}</p> */}
          <p>status: {statusObj[jsonData["status"]]}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ViewStatusPage;
