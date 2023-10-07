import styles from './singleFIR.module.css';
import './singleFIR.css';

function SingleFIR(props) {
	return (
    <>
      <div class="wrap-collabsible">
        <input id={props["id"]} class="toggle" type="checkbox" />
        <label for={props["id"]} class="lbl-toggle">
          More Info
        </label>
        <div class="collapsible-content">
          <div class="content-inner">
            <div className={styles.main}>
              <p>
                <b>id</b>: {props["id"]}
              </p>
              <p>
                <b>user_id</b>: {props["user_id"]}
              </p>
              <p>
                <b>assigned_officer_id</b>: {props["assigned_officer_id"]}
              </p>
              <p>
                <b>date_of_offence</b>: {props["date_of_offence"]}
              </p>
              <p>
                <b>place_of_offence</b>: {props["place_of_offence"]}
              </p>
              <p>
                <b>transaction_id</b>: {props["transaction_id"]}
              </p>
              <p>
                <b>status</b>: {props["status"]}
              </p>
              <p>
                <b>zonal_code</b>: {props["zonal_code"]}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { SingleFIR };