import React, { useState } from 'react'
import classes from './FIRMainPage.module.css'
import useEth from "../../contexts/EthContext/useEth";

const FIRMainPage = () => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [transactionId, setTransactionId] = useState("");

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  }
    

    const acceptFIR = async () => {

        try {
            const userFIR = {
              id: 2,
              assignedOfficerId: 3,
              transactionId:"jfoigweow83432woeiuhdsiugpt34gtadf3",
              status: 0, // You can set the initial status as needed
              crimeType: 2,
            };
        
            const result = await contract.methods.acceptFIR(userFIR.id,userFIR.assignedOfficerId,userFIR.transactionId,userFIR.crimeType).send({ from: accounts[0] });
          console.log(result);
          alert(result?.events?.Result?.returnValues?.message);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    
  const viewFIR = async (transactionId) => {
    try {
      const result = await contract.methods
        .FIRList(transactionId)
        .call({ from: accounts[0] });
      console.log(result);
      console.log(result.status);
      alert(`Your FIR Application has been ${result.status === "1" ? "Accepted" : "Rejected"}`)
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const rejectFIR = async () => {
    try {
    const userFIR = {
      id: 1,
      assignedOfficerId: 2,
      transactionId: "dskfkjhew8723buehudp9373h2dfaf4fds",
      status: 0, // You can set the initial status as needed
      crimeType: 3,
    };

const result = await contract.methods
  .rejectFIR(
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
    <div className={classes.container}>
      <button className={classes.button} onClick={acceptFIR}>
        Accept FIR
      </button>
      <label>Enter Transaction Id</label>
      <input onChange={handleTransactionIdChange}></input>
      <button className={classes.button} onClick={() => viewFIR(transactionId)}>
        View FIR
      </button>
      <button className={classes.button} onClick={rejectFIR}>
        Reject FIR
      </button>
    </div>
  );
}

export default FIRMainPage;