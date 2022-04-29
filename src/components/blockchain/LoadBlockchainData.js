import { abi, address } from "./AddressAndAbi";
export const LoadBlockchainData = async function () {
  window.contract = new window.web3.eth.Contract(abi, address);
};
