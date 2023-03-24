// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DiveLog {
    address public owner;
    address public buddy;
    uint public diveDate;
    uint public maxDepth;
    uint public duration;
    uint public surfaceInterval;
    bool public isRepeated;
    bool public isContinued;
    string public repetitionGroupIn;
    string public repetitionGroupOut;
    bool public isNitrox;
    string public nitroxType;
    uint public airTemperature;
    uint public waterTemperature;
    string public diveSite;
    string public equipment;
    string public notes;
    string public visibility;
    bool public signed;

    event DiveLogSigned(address indexed signer);

    constructor(address _owner, address _buddy) {
        owner = _owner;
        buddy = _buddy;
        signed = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyBuddy() {
        require(msg.sender == buddy, "Only the buddy can call this function");
        _;
    }

    modifier notSigned() {
        require(!signed, "Dive log is already signed");
        _;
    }

    function updateDiveDate(uint _diveDate) public onlyOwner notSigned {
        diveDate = _diveDate;
    }

    function updateMaxDepth(uint _maxDepth) public onlyOwner notSigned {
        maxDepth = _maxDepth;
    }

    function updateDuration(uint _duration) public onlyOwner notSigned {
        duration = _duration;
    }

    function updateSurfaceInterval(
        uint _surfaceInterval
    ) public onlyOwner notSigned {
        surfaceInterval = _surfaceInterval;
    }

    function updateIsRepeated(bool _isRepeated) public onlyOwner notSigned {
        isRepeated = _isRepeated;
    }

    function updateIsContinued(bool _isContinued) public onlyOwner notSigned {
        isContinued = _isContinued;
    }

    function updateRepetitionGroupIn(
        string memory _repetitionGroupIn
    ) public onlyOwner notSigned {
        repetitionGroupIn = _repetitionGroupIn;
    }

    function updateRepetitionGroupOut(
        string memory _repetitionGroupOut
    ) public onlyOwner notSigned {
        repetitionGroupOut = _repetitionGroupOut;
    }

    function updateIsNitrox(bool _isNitrox) public onlyOwner notSigned {
        isNitrox = _isNitrox;
    }

    function updateNitroxType(
        string memory _nitroxType
    ) public onlyOwner notSigned {
        nitroxType = _nitroxType;
    }

    function updateAirTemperature(
        uint _airTemperature
    ) public onlyOwner notSigned {
        airTemperature = _airTemperature;
    }

    function updateWaterTemperature(
        uint _waterTemperature
    ) public onlyOwner notSigned {
        waterTemperature = _waterTemperature;
    }

    function updateDiveSite(
        string memory _diveSite
    ) public onlyOwner notSigned {
        diveSite = _diveSite;
    }

    function updateEquipment(
        string memory _equipment
    ) public onlyOwner notSigned {
        equipment = _equipment;
    }

    function updateNotes(string memory _notes) public onlyOwner notSigned {
        notes = _notes;
    }

    function updateVisibility(
        string memory _visibility
    ) public onlyOwner notSigned {
        visibility = _visibility;
    }

    function signDiveLog() public onlyBuddy notSigned {
        signed = true;
        emit DiveLogSigned(msg.sender);
    }
}
