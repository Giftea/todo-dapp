import abiJSON from "./todo.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x0FDA0F6739DF162B9124090Ea5F4FB17df56e46e";
  const contractABI = abiJSON.abi;
  let todoContract;
  try {
    const { ethereum } = window;

    if (ethereum) {
      //checking for eth object in the window
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      todoContract = new ethers.Contract(contractAddress, contractABI, signer); // create new connection to the contract
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return todoContract;
}

export default connectContract;
// 0xf8Ff1baA1A4f0B44b93dd5546f93F6BF5BDA0Bbf
// 0xA98E6ADc85BDdc09C55c088193ef36Da4B92C56b

// ADD_YOUR_CONTRACT'S_ADDRESS