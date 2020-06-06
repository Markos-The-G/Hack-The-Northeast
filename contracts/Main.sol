pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Main {
    
    address initialCreator; 
    constructor() payable public {
        initialCreator = msg.sender;
    }
    
    //Ipfs thing
  string storedData;

  function set(string memory x) public {
    storedData = x;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
 
  function () external payable {

  }

    
    
    //These are just defining data stuff... *******
    struct submission {
        address payable submitter;
        uint256 accuracy;
        string bountyName;
    }
    
    struct bounty {
        string name;
        submission[] submissions;
        uint256 requirement;
        uint256 bountyAmount;
    }
    
    mapping(address => bounty) bountyHashTable;
    address payable[] bountyAddresses;
    
    bool bountyTracker = true;
    function resetBountyTracker() private {
        bountyTracker = true;
    }
    // ****************
    
    function returnBountyAddresses() public view returns (address payable[] memory) {
        return bountyAddresses;
    }
    //First main function, add a new bounty (in this contract i refer to _address as the bounty creator, _submitter as a test case submitter)
    function addNewBounty(address payable _address, string memory _name, uint256 _requirement, uint256 _bountyAmount) public {
        for (uint256 i = 0; i < bountyAddresses.length; i++) { 
            if (bountyAddresses[i] == _address) {
                bountyTracker = false;
                break;
            }
        }
        if (bountyTracker == true) {
            require (msg.sender == initialCreator);
            bountyHashTable[_address].name = _name;
            bountyHashTable[_address].requirement = _requirement;
            bountyHashTable[_address].bountyAmount = _bountyAmount;
            bountyAddresses.push(_address);
        } else {
            resetBountyTracker();
        }
    }
    
    //Helper function and bool. No endpoint *****
    bool submissionTracker = true;
    function resetSubmissionTracker() private {
        submissionTracker = true;
    }
    //***
    
    //Adding a new submission - see main function comment for parameters
    function addNewSubmission(uint256 _accuracy, address payable _submitter, address payable _address) public {
            for (uint256 k = 0; k < bountyHashTable[_address].submissions.length; k++) {
                if (bountyHashTable[_address].submissions[k].submitter == _submitter) {
                    submissionTracker == false;
                    break;
                }
        }
        
        if (submissionTracker == true) {
            require (msg.sender == initialCreator);
            submission memory sub;
            sub.submitter = _submitter;
            sub.accuracy = _accuracy;
            sub.bountyName = bountyHashTable[_address].name;
            bountyHashTable[_address].submissions.push(sub);
        } else {
            resetSubmissionTracker();
        }
    }
    
    //Helper function - _amount is in wei BTW - no endpoint please
    function payment(address payable _submitter, uint256  _amount)public payable returns (bool) {
        require (msg.sender == initialCreator);
        require (address(this).balance > _amount);
        _submitter.transfer(_amount);
        return true;
    }
    //here we need the address of the user who made the bounty, the submitter that is getting partial payment, it updates the amount in bounty too
    function partialPayment(address payable _submitter, uint256 _amount, address payable _address) public payable returns (bool) {
        require (msg.sender == initialCreator);
        payment(_submitter, _amount);
        bountyHashTable[_address].bountyAmount = bountyHashTable[_address].bountyAmount - _amount;
        return true;
    }
    
    //This completes the full payment with only submitter and bounty maker address, then deletes the bounty
    function fullPayment(address payable _submitter, address payable _address) public payable returns (bool){
        require (msg.sender == initialCreator);
        require (address(this).balance >= bountyHashTable[_address].bountyAmount);
        _submitter.transfer(bountyHashTable[_address].bountyAmount);
        bountyHashTable[_address].bountyAmount = 0;
        bountyHashTable[_address].name = "";
        bountyHashTable[_address].requirement = 0;
        delete bountyHashTable[_address].submissions;
        
        for (uint256 l = 0; l < bountyAddresses.length; l++) {
            if (bountyAddresses[l] == _address) {
                delete bountyAddresses[l];
                break;
            }
        }
        return true;
    }
    
    //Helper function and array, do not make endpoint, used in the main function of retrieving bounties
    bounty[] tempBountyArray;
    function returnTempBountyArray() public view returns (bounty[] memory) {
        return tempBountyArray;
    }

    function deleteTempBountyArray() public {
        delete tempBountyArray;
    }
    
    //Main retriever function, returns results then clears it too - this is obv an endpoint -- also, this technically returns all submissions for all given bounties
    function retreieveTempBountyArray() public {
        for (uint256 j = 0; j < bountyAddresses.length; j++) {
            tempBountyArray.push(bountyHashTable[bountyAddresses[j]]);
        }
        returnTempBountyArray();
    }
    
    //This is a helper function and array - do not pay attention or endpoint
    submission[] tempSubmissionArray;
    function returnTempSubmissionArray() public view returns (submission[] memory) {
        return tempSubmissionArray;
    }
    function deleteTempSubmissionArray() public {
        delete tempSubmissionArray;
    }
    
    //This function for endpoint finds all the submissions for any given address and returns an array of it including their accuracy and the name of the bounty 
    function retrieveTempSubmissionArray(address _submitter) public {
        for (uint256 p = 0; p < bountyAddresses.length; p++) {
            for (uint256 u = 0; u < bountyHashTable[bountyAddresses[p]].submissions.length; u++) {
                if (bountyHashTable[bountyAddresses[p]].submissions[u].submitter == _submitter) {
                    tempSubmissionArray.push( bountyHashTable[bountyAddresses[p]].submissions[u]);
                }
            }
        }
        returnTempSubmissionArray();
    }
    
}
