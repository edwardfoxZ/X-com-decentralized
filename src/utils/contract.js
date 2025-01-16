import { ethers } from "ethers";
import TwitterAbi from "../abis/Twitter.json";

const CONTRACT_ADDRESS = "0xbcd1e518d3B084Ad1ebb7936b7ceDf92d529ABdf";

export const getContract = () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    // Use provider for read-only (call) operations
    const contractRead = new ethers.Contract(
      CONTRACT_ADDRESS,
      TwitterAbi.abi,
      provider // This should use provider for read-only actions
    );

    // Use signer for transactions (e.g., state-changing functions like follow)
    const contractWrite = new ethers.Contract(
      CONTRACT_ADDRESS,
      TwitterAbi.abi,
      signer // This should use signer for transactions
    );

    return { contractRead, contractWrite, provider, signer };
  } else {
    console.error("MetaMask is not installed!");
    return {};
  }
};
