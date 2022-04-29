import Web3 from "web3";

export const LoadWeb3 = async function () {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!!!"
      );
    }
  } catch {
    window.alert("This error for loadWeb3 function");
  }
};
