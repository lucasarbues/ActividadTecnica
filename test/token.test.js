// Preguntas: se hace un archivo de test por organizacion, pero de podria hacer todos los tests en el deploy-test?

const { expect } = require("chai");
const { ethers } = require("hardhat");
//const WFT = artifacts.require("WFT"); //trae la informacion del deploy desde la carpeta de artifacts


describe("Token", async () => {
//describe("Transfer", function () {  // que hace el describe? (creeria que engloba tests en una misma funcion) cual es la diferencia con contract?
    
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'; 





    beforeEach( async() => { // se corre antes de cada it, beforeAll una vez antes de todos los it

      //deploy
      //wft = await WFT.new({from: DEPLOYER}); //WFT funciona como un contract factory
     
      // --> funciona igual que lo de arriba
  
  
    })

    it("Should transfer token correctly", async function () { // it mas descriptivo
     // const [owner] = await ethers.getSigners(); //que es un signer? --> accounts
    
     let wft;

     // Set accounts as users
      const [user1,user2,user3] = await ethers.getSigners();

      const WFT = await ethers.getContractFactory("WFToken");
      wft = await WFT.deploy(); //aca deberia deployarlo con el nombre wft? se utiliza esta forma o la de arriba?

      const amountToTransfer = BigInt(50e18); // No parametrizar, hacer un it para cada caso de test


      const balanceOfUser1BeforeTransfering =  BigInt(
        await wft.balanceOf(user1.address)
      );

      const balanceOfUser2BeforeTransfering =  BigInt(
        await wft.balanceOf(user2.address)
      );

      await wft.transfer(user2.address, amountToTransfer); //no se si funciona asi

      const balanceOfUser1 =  BigInt(
        await wft.balanceOf(user1.address)
      ).toString();

      const balanceOfUser2 =  BigInt(
        await wft.balanceOf(user2.address)
      ).toString();

  
      const expectedBalanceOfUser1 = (balanceOfUser1BeforeTransfering
        - amountToTransfer)
        .toString();
      
      const expectedBalanceOfUser2 = (balanceOfUser2BeforeTransfering
        + amountToTransfer)
        .toString();

        expect(balanceOfUser1).to.eq(expectedBalanceOfUser1);
        expect(balanceOfUser2).to.eq(expectedBalanceOfUser2);
    });

    it("Should allow to transfer full balance", async function () {
     
      let wft;
 
      // Set accounts as users
       const [user1,user2,user3] = await ethers.getSigners();
 
       const WFT = await ethers.getContractFactory("WFToken");
       wft = await WFT.deploy(); //aca deberia deployarlo con el nombre wft? se utiliza esta forma o la de arriba?
  
 
       const balanceOfUser1BeforeTransfering =  BigInt(
         await wft.balanceOf(user1.address)
       );
 

       await wft.transfer(user2.address, balanceOfUser1BeforeTransfering); //no se si funciona asi
 
      await expect(
        wft.transfer(user2.address, balanceOfUser1BeforeTransfering) 
      ).to.not.be.reverted;

     });

    it("Should manage 0-token transfer correctly", async function () { // it mas descriptivo
     
      let wft;
 
      // Set accounts as users
       const [user1,user2,user3] = await ethers.getSigners();
 
       const WFT = await ethers.getContractFactory("WFToken");
       wft = await WFT.deploy(); //aca deberia deployarlo con el nombre wft? se utiliza esta forma o la de arriba?
 
       const amountToTransfer = BigInt(0e18); // No parametrizar, hacer un it para cada caso de test
 
       const balanceOfUser1BeforeTransfering =  BigInt(
         await wft.balanceOf(user1.address)
       );
 
       const balanceOfUser2BeforeTransfering =  BigInt(
         await wft.balanceOf(user2.address)
       );
 
       await wft.transfer(user2.address, amountToTransfer); 
 
       const balanceOfUser1 =  BigInt(
         await wft.balanceOf(user1.address)
       ).toString();
 
       const balanceOfUser2 =  BigInt(
         await wft.balanceOf(user2.address)
       ).toString();

         expect(balanceOfUser1).to.eq(balanceOfUser1BeforeTransfering);
         expect(balanceOfUser2).to.eq(balanceOfUser2BeforeTransfering);
     });

     it("Should revert transfers bigger than balance", async function () { 
     
      let wft;
 
      // Set accounts as users
       const [user1,user2,user3] = await ethers.getSigners();
 
       const WFT = await ethers.getContractFactory("WFToken");
       wft = await WFT.deploy(); //aca deberia deployarlo con el nombre wft? se utiliza esta forma o la de arriba?
 
 
       const balanceOfUser1BeforeTransfering =  BigInt(
         await wft.balanceOf(user1.address)
       );

       const amountToTransfer = BigInt(10e18) + balanceOfUser1BeforeTransfering;
 
 
      await expect(
        wft.transfer(user2.address, amountToTransfer) ,
        "Transfer Exceeds balance"
      ).to.be.reverted;
     });
  });