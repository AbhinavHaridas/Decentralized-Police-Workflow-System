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

    function createFIR(uint _id, uint _assignedOfficerId, string memory _transactionId, uint _crimeType) public {
    // Check to see if an FIR has already been accepted or rejected
    if(FIRList[_transactionId].id != 0){
        emit Result(0,"Following FIR has already been accepted or rejected");
    }
    else{
    FIR memory userFIR;
    userFIR.id = _id;
    userFIR.assignedOfficerId = _assignedOfficerId;
    userFIR.transactionId = _transactionId;
    userFIR.status = 0;
    userFIR.crimeType = _crimeType;
    FIRList[userFIR.transactionId] = userFIR;
    emit Result(1,"FIR Has been created");
    }
    }

    // function acceptFIR(uint _id, uint _assignedOfficerId, string memory _transactionId, uint _crimeType) public {
    // // Check to see if an FIR has already been accepted or rejected
    // if(FIRList[_transactionId].id != 0){
    //     emit Result(0,"Following FIR has already been accepted or rejected");
    // }
    // else{
    // FIR memory userFIR;
    // userFIR.id = _id;
    // userFIR.assignedOfficerId = _assignedOfficerId;
    // userFIR.transactionId = _transactionId;
    // userFIR.status = 1;
    // userFIR.crimeType = _crimeType;
    // FIRList[userFIR.transactionId] = userFIR;
    // emit Result(1,"FIR Has been Accepted");
    // }
    // }


    function acceptFIR(string memory _transactionId) public {
        // Check to see if an FIR with the given transactionId exists
        require(FIRList[_transactionId].id != 0, "FIR not found");

        // Update the status of the existing FIR
        FIRList[_transactionId].status = 1;

        emit Result(1, "FIR Has been Accepted");
    }


    // function rejectFIR(uint _id, uint _assignedOfficerId, string memory _transactionId, uint _crimeType) public {
    // // Check to see if an FIR has already been accepted or rejected
    // if(FIRList[_transactionId].id != 0){
    //     revert("Following FIR has already been accepted or rejected");
    // }
    // else{
    // FIR memory userFIR;
    // userFIR.id = _id;
    // userFIR.assignedOfficerId = _assignedOfficerId;
    // userFIR.transactionId = _transactionId;
    // userFIR.status = -1;
    // userFIR.crimeType = _crimeType;
    // FIRList[userFIR.transactionId] = userFIR;
    // emit Result(1,"FIR Has been rejected");
    // }
    // }

    function rejectFIR(string memory _transactionId) public {
    // Check to see if an FIR with the given transactionId exists
    require(FIRList[_transactionId].id != 0, "FIR not found");

    // Update the status of the existing FIR to mark it as rejected (status = -1)
    FIRList[_transactionId].status = -1;

    emit Result(1, "FIR Has been Rejected");
    }


}