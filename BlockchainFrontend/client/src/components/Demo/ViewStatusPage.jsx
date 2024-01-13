import styles from "./ViewStatusPage.module.css";
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const statusObj = {
  0: "Your FIR is still Pending",
  1: "Your FIR has been Approved",
  "-1": "Your FIR has been Rejected",
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
      alert(statusObj[result.status])
      setJsonData(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="border shadow-xl border-gray-400 rounded-lg">
        <h1 className="pt-6 text-2xl font-bold mb-4 text-blue-700 text-center">
          View FIR
        </h1>

        <div className="flex flex-col items-center pb-8 pt-8 px-4">
          <label class="block mb-2 pb-4 text-sm font-medium text-blue-700 dark:text-white">
            Enter Transaction ID
          </label>
          <input
            type="text"
            className="shadow-sm bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light sm:w-64"
              onChange={(e) => setTransactionID(e.target.value)}
          ></input>
          <div className="pt-6">
            <button
              className="text-white  bg-blue-700 hover:bg-white border border-blue-700 hover:border-blue-700 hover:text-blue-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              onClick={callFIR}
            >
              Check Status
            </button>
          </div>
        </div>

        {/* {jsonData ? (
       <div className="bg-white shadow-md rounded-md p-8 max-w-l w-auto overflow-y-auto ">
          <p>id: {element["id"]}</p>
          <p>status: {statusObj[jsonData["status"]]}</p>
        </div>
      ) : null} */}

      </div>
    </div>
  );
}

export default ViewStatusPage;
