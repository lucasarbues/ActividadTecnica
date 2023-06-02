// Preguntas: se hace un archivo de test por organizacion, pero de podria hacer todos los tests en el deploy-test?

const { expect } = require("chai");
const { ethers } = require("hardhat");
//const WFT = artifacts.require("WFT"); //trae la informacion del deploy desde la carpeta de artifacts
const WFT = ethers.getContractFactory("WFToken");


describe("Token", async () => {
//describe("Transfer", function () {  // que hace el describe? (creeria que engloba tests en una misma funcion) cual es la diferencia con contract?
    
    let wft;
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'; 
    const DEPLOYER = accounts[1]; 

      // Set accounts as users
    const user1 = accounts[5];
    const user2 = accounts[6];
    const user3 = accounts[7];

    console.log('hola');

    beforeEach( async() => { // se corre antes de cada it, beforeAll una vez antes de todos los it

      //deploy
      //wft = await WFT.new({from: DEPLOYER}); //WFT funciona como un contract factory
     
      // --> funciona igual que lo de arriba
  
      wft = await WFT.deploy(); //aca deberia deployarlo con el nombre wft? se utiliza esta forma o la de arriba?
  
    })

    it("Should transfer token correctly", async function () { // it mas descriptivo
      const [owner] = await ethers.getSigners(); //que es un signer?
  

      const amountToTransfer = new BigNumber(50e18); // No parametrizar, hacer un it para cada caso de test


      const balanceOfUser1BeforeTransfering = new BigNumber(
        await wft.balanceOf(user1)
      );

      const balanceOfUser2BeforeTransfering = new BigNumber(
        await wft.balanceOf(user2)
      );

      await user1.transfer(user2, amountToTransfer); //no se si funciona asi

      const balanceOfUser1 = new BigNumber(
        await wft.balanceOf(user1)
      ).toString();

      const balanceOfUser2 = new BigNumber(
        await wft.balanceOf(user2)
      ).toString();

  
      const expectedBalanceOfUser1 = balanceOfUser1BeforeTransfering
        .minus(amountToTransfer)
        .toString();
      
      const expectedBalanceOfUser2 = balanceOfUser2BeforeTransfering
        .plus(amountToTransfer)
        .toString();

        expect(balanceOfUser1).to.eq(expectedBalanceOfUser1);
        expect(balanceOfUser2).to.eq(expectedBalanceOfUser2);
    });
  });