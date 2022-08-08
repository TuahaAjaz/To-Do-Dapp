import { expect } from "chai";
import { ethers } from "hardhat";
import { listenerCount } from "process";

describe("To do list", async () => { 
    describe("Add Task", async() => {
        it("Should insert add task successfully!", async () => {
            const List = await ethers.getContractFactory("List");
            const list = await List.deploy();
            await list.deployed();
            await list.addToList("Hey");
            expect(await list.getLastElement()).to.be.not.undefined;
            expect(await list.getLastElement()).to.be.not.null;
            expect(await list.getLastElement()).to.equal('Hey');
        })
    })
    describe("Work Done", () => {
        it("Should meke done true for work done", async () => {
            const List = await ethers.getContractFactory("List");
            const list = await List.deploy();
            await list.deployed();
            await list.addToList("Hey");
            await list.workDone('Hey');
            const checkDone = await list.getLastDone();
            console.log(checkDone);
            expect(checkDone).to.equal(true);
        })
        it("For Multiple values", async () => {
            const List = await ethers.getContractFactory("List");
            const list = await List.deploy();
            await list.deployed();
            await list.addToList("Hey");
            await list.addToList("There");
            await list.addToList("You");
            await list.workDone('You');
            const checkDone = await list.getLastDone();
            expect(checkDone).to.equal(true);
        })
    })
    describe("deleteWork", async () => {
        it("Should delete the specified task", async () => {
            const List = await ethers.getContractFactory("List");
            const list = await List.deploy();
            await list.deployed();
            await list.addToList("Hey");
            await list.addToList("There");
            await list.addToList("You");
            await list.deleteTask("There");
            const str = await list.getIndexedElement(1);
            expect(str).to.not.equal("There");
            expect(str).to.equal("You");
        })
    })
    describe("getList", async () => {
        it("Should get complete map", async () => {
            const List = await ethers.getContractFactory("List");
            const list = await List.deploy();
            await list.deployed();
            await list.addToList("Hey");
            await list.addToList("There");
            await list.addToList("You");
            const str = await list.getList();
            console.log(str);
        })
    })
})