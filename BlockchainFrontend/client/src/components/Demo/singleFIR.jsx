import styles from "./singleFIR.module.css";
import "./singleFIR.css";
import useEth from "../../contexts/EthContext/useEth";

function SingleFIR({ props }) {
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
        id: props["id"],
        assignedOfficerId: props["assigned_officer_id"],
        transactionId: props["transaction_id"],
        status: props["status"],
        crimeType: 2,
      };

      const result = await contract.methods
        .acceptFIR(
          userFIR.id,
          userFIR.assignedOfficerId,
          userFIR.transactionId,
          userFIR.crimeType
        )
        .send({ from: accounts[0] });
      console.log(result);
      alert(result?.events?.Result?.returnValues?.message);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <div className="wrap-collabsible">
        <input id={props["id"]} className="toggle" type="checkbox" />
        <label htmlFor={props["id"]} className="lbl-toggle">
          <div className="fir-wrap-header">
            <p>
              <b>id</b>: {props["id"]}
            </p>
            <p>
              <b>Date</b>: {formatDate(props["date_of_offence"])}
            </p>
            <p>
              <b>status</b>: {statusObj[props["status"]]}
            </p>
          </div>
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            <div className={styles.main}>
              <p>
                <b>place_of_offence</b>: {props["place_of_offence"]}
              </p>
              <p>
                <b>crime_type</b>: {props["crime_type"]}
              </p>
              <p>
                <b>ipc_section</b>: {props["ipc_section"]}
              </p>
              <p>
                <b>suspect_details</b>: {props["suspect_details"]}
              </p>
              <p>
                <b>fir_contents</b>: {props["fir_contents"]}
              </p>
              <div className="fir-btns-container">
                {props["status"] == 0 ? (
                  <div className="button-1">
                    <div className="eff-1"></div>
                    <span>Accept</span>
                  </div>
                ) : null}
                {props["status"] == 0 ? (
                  <div className="button-1">
                    <div className="eff-1"></div>
                    <span>Reject</span>
                  </div>
                ) : null}
                <div className="button-1">
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
