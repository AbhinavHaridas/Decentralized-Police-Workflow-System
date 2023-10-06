// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract FIRSystem{

    // Structure of the FIR Object containing major detail about the FIR
    struct FIR{
        uint id;
        // uint userId;
        uint assignedOfficerId;
        string transactionId;
        int status;
        uint crimeType;
        // string ipcSection;
        // string[] evidenceHashes; // Contains pinata ids of evidences
    }

    // Defining an array to store all the FIRs
    mapping (string => FIR) public FIRList;

    //Defining count of FIRs
    uint public FIRCount = 0;

    // Result to be returned after successful transaction
    event Result(
        uint status,
        string message
    );


    // function acceptFIR(FIR memory userFIR) public returns (Result memory){
    //     // Check to see if an FIR has already been accepted or rejected
    //     require(FIRList[userFIR.transactionId].id == 0 , "Following FIR has already been accepted or rejected");
    //     userFIR.status = 1;
    //     FIRList[userFIR.transactionId] = userFIR;

    //     return Result(1,"FIR Has been Accepted");
    // }

    function acceptFIR(uint _id, uint _assignedOfficerId, string memory _transactionId, uint _crimeType) public {
    // Check to see if an FIR has already been accepted or rejected
    if(FIRList[_transactionId].id != 0){
        emit Result(0,"Following FIR has already been accepted or rejected");
    }
    else{
    FIR memory userFIR;
    userFIR.id = _id;
    userFIR.assignedOfficerId = _assignedOfficerId;
    userFIR.transactionId = _transactionId;
    userFIR.status = 1;
    userFIR.crimeType = _crimeType;
    FIRList[userFIR.transactionId] = userFIR;
    emit Result(1,"FIR Has been Accepted");
    }
    }


    // function rejectFIR(FIR memory userFIR) public {
        
    //     userFIR.status = -1;
    //     FIRList[userFIR.transactionId] = userFIR;

    // }

    function rejectFIR(uint _id, uint _assignedOfficerId, string memory _transactionId, uint _crimeType) public {
    // Check to see if an FIR has already been accepted or rejected
    if(FIRList[_transactionId].id != 0){
        revert("Following FIR has already been accepted or rejected");
    }
    else{
    FIR memory userFIR;
    userFIR.id = _id;
    userFIR.assignedOfficerId = _assignedOfficerId;
    userFIR.transactionId = _transactionId;
    userFIR.status = -1;
    userFIR.crimeType = _crimeType;
    FIRList[userFIR.transactionId] = userFIR;
    emit Result(1,"FIR Has been rejected");
    }
    }

}