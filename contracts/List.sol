// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract List {
    struct list {
        string[] stuff;
        bool[] done;
    }
    mapping (address => list) toDo;

    //For testing!!
    function getLastElement() public view returns (string memory) {
        return toDo[msg.sender].stuff[toDo[msg.sender].stuff.length - 1];
    }

    function getIndexedElement(uint index) public view returns (string memory) {
        return toDo[msg.sender].stuff[index];
    }

    function getLastDone() public view returns (bool) {
        return toDo[msg.sender].done[toDo[msg.sender].done.length - 1];
    }
    //testing Done

    function getTasks () public view returns (string [] memory) {
        return toDo[msg.sender].stuff;
    }

    function getDone () public view returns (bool [] memory) {
        return toDo[msg.sender].done;
    }

    function addToList (string memory something) public {
        toDo[msg.sender].stuff.push(something);
        toDo[msg.sender].done.push(false);
    }

    function getList () public view returns (list memory) {
        return toDo[msg.sender];
    }

    function workDone (string memory a) public returns (bool){
        bool flag = false;
        for(uint i = 0; i < toDo[msg.sender].stuff.length; i++) {
            if(keccak256(bytes(a)) == keccak256(bytes(toDo[msg.sender].stuff[i]))) {
                toDo[msg.sender].done[i] = true;
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    function deleteTask (string memory task) public {
        bool flag = false;
        for(uint i = 0; i < toDo[msg.sender].stuff.length; i++) {
            if(keccak256(bytes(task)) == keccak256(bytes(toDo[msg.sender].stuff[i]))) {
                for(uint j = i; j < toDo[msg.sender].stuff.length - 1; j++) {
                    toDo[msg.sender].stuff[j] = toDo[msg.sender].stuff[j + 1];
                    toDo[msg.sender].done[j] = toDo[msg.sender].done[j + 1];
                }
                flag = true;
            }
            if(flag == true) {
                toDo[msg.sender].stuff.pop();
                toDo[msg.sender].done.pop();
                break;
            }
        }
    }

}