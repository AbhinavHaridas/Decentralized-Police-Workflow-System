import React from 'react'
import classes from './FIRMainPage.module.css'
import useEth from "../../contexts/EthContext/useEth";

const FIRMainPage = () => {
  const {
    state: { contract, accounts },
    } = useEth();
    

    const acceptFIR = async () => {

        try {
            const userFIR = {
              id: 1,
              assignedOfficerId: 2,
              transactionId: "12345",
              status: 0, // You can set the initial status as needed
              crimeType: 3,
        };
        
            const result = await contract.methods.acceptFIR(userFIR.id,userFIR.assignedOfficerId,userFIR.transactionId,userFIR.crimeType).send({ from: accounts[0] });
          console.log(result);
          console.log(result?.event?.Result);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    
  const viewFIR = async () => {
    try {
      const result = await contract.methods.FIRList("12345").call({ from: accounts[0] });
      console.log(result);
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
  transactionId: "12345",
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
      console.log(result?.events?.Result?.returnValues?.message);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


    
  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={acceptFIR}>Accept FIR</button>
      <button className={classes.button} onClick={viewFIR}>View FIR</button>
      <button className={classes.button} onClick={rejectFIR}>Reject FIR</button>
    </div>
  );
}

export default FIRMainPage