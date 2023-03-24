// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DiveLog.sol";

contract DiveLogFactory {
    address public owner;
    mapping(address => address[]) public userDiveLogs;

    event DiveLogCreated(
        address indexed diveLog,
        address indexed creator,
        address indexed buddy
    );

    constructor() {
        owner = msg.sender;
    }

    function createDiveLog(address _buddy) public {
        DiveLog newDiveLog = new DiveLog(msg.sender, _buddy);
        address newDiveLogAddress = address(newDiveLog);
        userDiveLogs[msg.sender].push(newDiveLogAddress);
        userDiveLogs[_buddy].push(newDiveLogAddress);
        emit DiveLogCreated(newDiveLogAddress, msg.sender, _buddy);
    }

    // Nuevo método para obtener la lista de buceos en los que una dirección es propietaria o compañera
    function getDiveLogsByUser(
        address user
    ) public view returns (address[] memory) {
        return userDiveLogs[user];
    }
}
