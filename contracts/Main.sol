pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Main {
    
    address payable initialCreator; 
    constructor() public {
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
 
//   function () external payable {

//   }
    
    
    struct submission {
        address payable submitter;
        uint256 accuracy;
    }
    
    struct bounty {
        string name;
        submission[] submissions;
        uint256 requirement;
        uint256 bountyAmount;
    }
    
    mapping(address => bounty) bountyHashTable;
    address payable[] bountyAddresses;
    
    bool bountyTracker;
    function resetBountyTracker() private {
        bountyTracker = true;
    }
    
    function addNewBounty(address payable _address, string memory _name, uint256 _requirement, uint256 _bountyAmount) public {
        for (uint256 i = 0; i < bountyAddresses.length; i++) { 
            if (bountyAddresses[i] == _address) {
                bountyTracker == false;
                break;
            }
        }
        if (bountyTracker == true) {
            require (msg.sender == initialCreator);
            bountyHashTable[_address].name = _name;
            bountyHashTable[_address].requirement = _requirement;
            bountyHashTable[_address].bountyAmount = _bountyAmount;
        } else {
            resetBountyTracker;
        }
    }
    
    
    
}
