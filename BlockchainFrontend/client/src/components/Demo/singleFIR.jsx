import styles from "./singleFIR.module.css";
import "./singleFIR.css";
import useEth from "../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";

function SingleFIR({ fir, department_id, updateData }) {
  const navigate = useNavigate();
  const {
    state: { contract, accounts },
  } = useEth();

  const statusObj = {
    0: "Pending",
    1: "Approved",
    "-1": "Rejected",
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const acceptFIR = async () => {
    try {
      const userFIR = {
        id: fir["id"],
        assignedOfficerId: fir["assigned_officer_id"],
        transactionId: fir["transaction_id"],
        status: fir["status"],
        crimeType: 2,
      };

      const result = await contract.methods
        .acceptFIR(userFIR.transactionId)
        .send({ from: accounts[0] });
      alert(result?.events?.Result?.returnValues?.message);
      if (result?.events?.Result?.returnValues?.status == "1") {
        fetch(
          "http://localhost:8000/fir/changeFirStatus?fir_id=" +
            fir["id"] +
            "&status=1"
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              fir["status"] = 1;
              updateData(fir);
            }
          });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const rejectFIR = async () => {
    try {
      const userFIR = {
        id: fir["id"],
        assignedOfficerId: fir["assigned_officer_id"],
        transactionId: fir["transaction_id"],
        status: fir["status"],
        crimeType: 2,
      };

      const result = await contract.methods
        .rejectFIR(userFIR.transactionId)
        .send({ from: accounts[0] });
      console.log(result);
      alert(result?.events?.Result?.returnValues?.message);
      if (result?.events?.Result?.returnValues?.status == "1") {
        fetch(
          "http://localhost:8000/fir/changeFirStatus?fir_id=" +
            fir["id"] +
            "&status=-1"
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              fir["status"] = -1;
              updateData(fir);
            }
          });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const navigateToViewEvidence = () => {
    navigate("/viewevidence", { state: { fir_id: fir["id"],department_id: department_id } });
  };

  return (
    <>
      <div className="wrap-collabsible">
        <input id={fir["id"]} className="toggle" type="checkbox" />
        <label htmlFor={fir["id"]} className="lbl-toggle">
          <div className="fir-wrap-header">
            <p>
              <b>id</b>: {fir["id"]}
            </p>
            <p>
              <b>Date</b>: {formatDate(fir["date_of_offence"])}
            </p>
            <p>
              <b>status</b>: {statusObj[fir["status"]]}
            </p>
          </div>
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            <div className={styles.main}>
              <p>
                <b>place_of_offence</b>: {fir["place_of_offence"]}
              </p>
              <p>
                <b>crime_type</b>: {fir["crime_type"]}
              </p>
              <p>
                <b>ipc_section</b>: {fir["ipc_section"]}
              </p>
              <p>
                <b>suspect_details</b>: {fir["suspect_details"]}
              </p>
              <p>
                <b>fir_contents</b>: {fir["fir_contents"]}
              </p>
              <div className="fir-btns-container">
                {fir["status"] == 0 ? (
                  <div className="button-1" onClick={acceptFIR}>
                    <div className="eff-1"></div>
                    <span>Accept</span>
                  </div>
                ) : null}
                {fir["status"] == 0 ? (
                  <div className="button-1" onClick={rejectFIR}>
                    <div className="eff-1"></div>
                    <span>Reject</span>
                  </div>
                ) : null}
                <div className="button-1" onClick={navigateToViewEvidence}>
                  <div className="eff-1"></div>
                  <span>View Evidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { SingleFIR };
