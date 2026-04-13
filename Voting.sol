// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    struct Vote {
        string voterId;
        uint candidateId;
        string constituency;
        uint timestamp;
    }

    // Track if voter already voted
    mapping(string => bool) public hasVoted;

    // Store all votes
    Vote[] public votes;

    // Cast vote
    function castVote(
        string memory _voterId,
        uint _candidateId,
        string memory _constituency
    ) public {

        // Prevent duplicate voting
        require(!hasVoted[_voterId], "Voter already voted");

        votes.push(Vote({
            voterId: _voterId,
            candidateId: _candidateId,
            constituency: _constituency,
            timestamp: block.timestamp
        }));

        hasVoted[_voterId] = true;
    }

    // Total votes
    function getVotesCount() public view returns (uint) {
        return votes.length;
    }

    // Get vote details
    function getVote(uint index) public view returns (
        string memory voterId,
        uint candidateId,
        string memory constituency,
        uint timestamp
    ) {
        Vote memory v = votes[index];
        return (v.voterId, v.candidateId, v.constituency, v.timestamp);
    }
}
