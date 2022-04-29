// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Evoting{
  //Voter authentication
   struct Voter{
        uint vote;
        bool voted;
        uint weight;
    }
    mapping(address => Voter) public voters;
    //Add candidate structure
       struct Candidate{
        string name;
        string party;
        int age;
        string qualification;
        string nidnumber;
        uint voteCount;
    }
    //Add candidate array
     Candidate[] public candidatepersons;
    
    //Add candidate function
     function Addcandidate(string memory name, string memory party, int age, string memory qualification, string memory nidnumber) public{
        candidatepersons.push(Candidate({
            name:name,
            party:party,
            age:age,
            qualification:qualification,
            nidnumber:nidnumber,
            voteCount:0
         })); 
    }
    //Returen candidate function
      function retriveCandidate() public view returns (Candidate[] memory){
        return candidatepersons;
    }

    //Voter registration structure
       struct Voterregister{
        uint nid;
        string  email;
        int status;
        address voteraddress;
    }
    //Voter registration array
     Voterregister[] public voterregisters;
    //Voter registration function code
     function Voterregistation(uint nid,string memory email, address voteraddress) public{
     
        voterregisters.push(Voterregister({
           nid:nid,
           email:email,
           status:0,
           voteraddress:voteraddress
         })); 
    }
      //Returen voters
      function retriveVoter() public view returns (Voterregister[] memory){
        return voterregisters;
    }
   
    //activeVoter function code 
    function activeVoter(uint nid) public{
      for(uint i=0; i< voterregisters.length; i++){
          if(voterregisters[i].nid == nid){
            voterregisters[i].status=1;
          }
      }
    } 

     //function authenticate voter
    
    function giveRightToVote(address voter) public{
        require(!voters[voter].voted,
            'The voter has already voted');
        require(voters[voter].weight == 0);
        voters[voter].weight= 1;
    }

    //Returen voter
    //   function retriveVoters() public view returns (Voter memory){
    //      Voter storage sender =voters[msg.sender];
    //     return sender;
    // }

     //function for voting 
    function vote(uint proposal) public{
        Voter storage sender =voters[msg.sender];
        require(sender.weight != 0, 'Has no right to vote');
        require(!sender.voted, 'Already voted');
        sender.voted=true;
        sender.vote=proposal;
        candidatepersons[proposal].voteCount =candidatepersons[proposal].voteCount + sender.weight;
    } 
}